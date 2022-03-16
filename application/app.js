import { SortingService } from './sorting.service.js'
import { StartButtonService } from './start-button.service.js'
import { ResetButtonService } from './reset-button.service.js'
import { WindowService } from './window.service.js'
import { CanvasService } from './canvas.service.js'

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
        const columns = this.canvasService.resetCanvas();
        this.sortingService = new SortingService(
            this.startButtonService,
            columns,
        );
    };

    constructor(){
        this.canvasService = new CanvasService();
        this.startButtonService = new StartButtonService(this.setRun);
        this.resetButtonService = new ResetButtonService(this.resetApp);
        this.windowService = new WindowService(this.setRun, this.resetApp);
        this.resetApp(true);
    }
}