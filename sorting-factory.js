
export class SortingFunctionFactory {
    run;
    animationTime;
    generatorFunction;

    setRun = (run) => {
        this.run = run;
    };

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    startInterval = () => {
        const iid = setInterval(() => {
            let isDone;

            if(this.run){
                const { done } = this.generatorFunction.next();
                isDone = done;
            } else {
                clearInterval(iid);
                this.setButtonToStart();
            };

            if(isDone){
                this.setAppState(false);
                this.startButton.setAttribute('disabled', true);
            };

        }, this.animationTime)
    }

    constructor(startButton, setButtonToStart, run, animationTime, generatorFunction, setAppState) {
        this.startButton = startButton;
        this.setButtonToStart = setButtonToStart;
        this.run = run;
        this.animationTime = animationTime;
        this.generatorFunction = generatorFunction;
        this.setAppState = setAppState;
    }
}