import { SortingService } from './services/sorting.service.js'
import { StartButtonService } from './services/start-button.service.js'
import { ResetButtonService } from './services/reset-button.service.js'
import { WindowService } from './services/window.service.js'
import { CanvasService } from './services/canvas.service.js'
import { AlgoSelectService } from './services/algo-select.service.js';
import { OrderService } from './services/order.service.js';
export class SortingApplication {
    run = false;

    setRun = (isRunning) => {
        this.run = isRunning ?? !this.run;
        if(this.run){
            this.sortingService.startSorting();
        } else {
            this.sortingService.setRunInterval(false);
        };
    };

    resetApp = (isInit) => {
        if(!isInit){
            this.setRun(false);
        };
        const sortingAlgorithm = this.algoSelectService.getSelectedAlgorithm();
        const order = this.orderService.getOrder();
        const columns = this.canvasService.resetCanvas();
        this.sortingService = new SortingService(
            sortingAlgorithm,
            order,
            this.startButtonService,
            columns,
        );
    };

    constructor(){
        this.algoSelectService = new AlgoSelectService(this.resetApp);
        this.orderService = new OrderService(this.resetApp);
        this.canvasService = new CanvasService();
        this.startButtonService = new StartButtonService(this.setRun);
        this.resetButtonService = new ResetButtonService(this.resetApp);
        this.windowService = new WindowService(this.setRun, this.resetApp);
        this.resetApp(true);
    }
}