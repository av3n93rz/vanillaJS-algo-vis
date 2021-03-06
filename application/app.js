import { SortingService } from './services/sorting.service.js'
import { StartButtonService } from './services/start-button.service.js'
import { ResetButtonService } from './services/reset-button.service.js'
import { WindowService } from './services/window.service.js'
import { CanvasService } from './services/canvas.service.js'
import { AlgoSelectService } from './services/algo-select.service.js';
import { OrderService } from './services/order.service.js';
import { SpeedRangeService } from './services/speed-range.service.js';
import { AlgoRunnerService } from './services/algo-runner.service.js';
import { ParamService } from './services/param.service.js';

export class SortingApplication {
    #params;
    #columnNumber = 15;
    run = false;

    setRun = (isRunning) => {
        this.run = isRunning ?? !this.run;
        if(this.run){
            this.sortingService.startSorting();
        } else {
            this.sortingService.setRunInterval(false);
        };
    };

    #changeColumnNumber = (o) => {
        if(o === 'increase' && this.#columnNumber < 50) {
            this.#columnNumber++
            this.resetApp();
        };
        if(o === 'decrease' && this.#columnNumber > 1) {
            this.#columnNumber--
            this.resetApp();
        };
    };

    resetApp = (isInit) => {
        if(!isInit){
            this.setRun(false);
        };
        const sortingAlgorithm = this.algoSelectService.getSelectedAlgorithm();
        const order = this.orderService.getOrder();
        const columns = this.canvasService.resetCanvas(this.#columnNumber);
        this.sortingService = new SortingService({
            order,
            columns,
            SortingAlgorithm: sortingAlgorithm,
            startButtonService: this.startButtonService,
            speedRangeService: this.speedRangeService,
            algoRunnerService: this.algoRunnerService,
        });
        if(isInit && (this.#params.start || this.#params.auto)) {
            this.setRun(true);
        };
    };

    constructor(){
        this.paramService = new ParamService();
        this.#params = this.paramService.params;
        this.speedRangeService = new SpeedRangeService();
        this.speedRangeService.setSortingSpeed(this.#params.s);
        this.algoSelectService = new AlgoSelectService(this.resetApp);
        this.algoSelectService.setSelectedAlgorithm(this.#params.a);
        this.orderService = new OrderService(this.resetApp);
        this.orderService.setOrder(this.#params.o);
        this.canvasService = new CanvasService();
        this.startButtonService = new StartButtonService(this.setRun);
        this.resetButtonService = new ResetButtonService(this.resetApp);
        this.algoRunnerService = new AlgoRunnerService(this.resetApp, this.setRun, this.#params.auto);
        this.windowService = new WindowService({
            changeColumnNumber: this.#changeColumnNumber,
            setAppState: this.setRun, 
            resetApp: this.resetApp,
            speedRangeService: this.speedRangeService,
            algoSelectService: this.algoSelectService,
            orderService: this.orderService,
        });
        this.resetApp(true);
    }
}