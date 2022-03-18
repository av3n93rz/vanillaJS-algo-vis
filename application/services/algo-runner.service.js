export class AlgoRunnerService {
    #resetApp;
    #setRun;
    #shouldRun;

    reRun = () => {
        if(this.#shouldRun) {
            this.#resetApp();
            this.#setRun(true);
        };
    };

    constructor(resetApp, setRun, shouldRun = false) {
        this.#shouldRun = shouldRun;
        this.#resetApp = resetApp;
        this.#setRun = setRun;
    };
};