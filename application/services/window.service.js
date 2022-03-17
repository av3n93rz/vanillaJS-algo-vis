export class WindowService {
    #window;

    constructor(setAppState, resetApp) {
        this.#window = window;
        this.#window.addEventListener('keypress', (event) => {
            if(event.code === 'Space') {
                setAppState();
            };
            if(event.code === 'KeyR') {
                resetApp();
            };
        });
    };
};