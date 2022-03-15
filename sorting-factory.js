
export class SortingFunctionFactory {
    runInterval;
    animationTime;
    generatorFunction;

    setRunInterval = (run) => {
        this.runInterval = run;
    };

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    startInterval = () => {
        const iid = setInterval(() => {
            let isDone;

            if(this.runInterval){
                const { done } = this.generatorFunction.next();
                isDone = done;
            } else {
                clearInterval(iid);
                this.setButtonToStart();
            };

            if(isDone){
                this.startButtonService.setDisabled(true)
            };

        }, this.animationTime)
    }

    constructor(startButtonService, run, animationTime, generatorFunction, setAppState) {
        this.startButtonService = startButtonService;
        this.runInterval = run;
        this.animationTime = animationTime;
        this.generatorFunction = generatorFunction;
        this.setAppState = setAppState;
    }
}