export class ResetButtonService {
    #resetButton;

    blur = () => {
        this.#resetButton.blur();
    };

    constructor(resetApp) {
        this.#resetButton = document.getElementById('reset');
        this.#resetButton.addEventListener('click', () => {
            resetApp();
            this.#resetButton.blur();
        });
    };
};