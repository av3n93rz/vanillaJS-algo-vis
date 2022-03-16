
import { BubbleSort } from './bubble-sort.js';
import { SpeedRangeService } from './speed-range.service.js';

export class SortingService {
    #runInterval;
    #animationTime;
    #startButtonService;
    #sortingAlgorithm;
    #generatorFunction;
    #speedRangeService;

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

    constructor(startButtonService, svgGroups) {
        this.#sortingAlgorithm = new BubbleSort(svgGroups);
        this.#generatorFunction = this.#sortingAlgorithm.generator();
        this.#startButtonService = startButtonService;
        this.#startButtonService.setDisabled(false);
        this.#speedRangeService = new SpeedRangeService();
        this.setRunInterval(false);
    };
};