import { SpeedRangeService } from './speed-range.service.js';
import { CounterService } from './counter.service.js';

export class SortingService {
    #runInterval;
    #animationTime;
    #startButtonService;
    #sortingAlgorithm;
    #generatorFunction;
    #speedRangeService;
    #columns;

    #setStartButton = () => {
        if(this.#runInterval) {
            this.#startButtonService.setToPause();
        } else {
            this.#startButtonService.setToStart();
        };
    };

    #setSpeedRangeDisability = () => {
        this.#speedRangeService.setDisability(this.#runInterval);
    };

    #setAnimationTime = (animationTime) => {
        this.#animationTime = animationTime;
        this.#sortingAlgorithm.setAnimationTime(animationTime);
    };

    #startInterval = () => {
        const intervalId = setInterval(() => {
            if(this.#runInterval) {
                const { done } = this.#generatorFunction.next();

                if(done) {
                    this.setRunInterval(false);
                    this.#startButtonService.setDisabled(true);
                };
            } else {
                clearInterval(intervalId);
            };
        }, this.#animationTime);
    };

    setRunInterval = (run) => {
        this.#runInterval = run;
        this.#setStartButton();
        this.#setSpeedRangeDisability();
    };

    startSorting = () => {
        this.setRunInterval(true);
        const animationTime = this.#speedRangeService.getAnimationTime();
        this.#setAnimationTime(animationTime);
        this.#startInterval();
    };

    setAlgorithm = (SortingAlgorithm, order) => {
        this.#sortingAlgorithm = new SortingAlgorithm(this.#columns, this.counterService, order);
        this.#generatorFunction = this.#sortingAlgorithm.generator();
    }
 
    constructor(SortingAlgorithm, order, startButtonService, columns) {
        this.#columns = columns;
        this.counterService = new CounterService();
        this.counterService.clearValues();
        this.setAlgorithm(SortingAlgorithm, order);
        this.#startButtonService = startButtonService;
        this.#startButtonService.setDisabled(false);
        this.#speedRangeService = new SpeedRangeService();
        this.setRunInterval(false);
    };
};