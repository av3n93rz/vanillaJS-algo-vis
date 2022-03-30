import { getById } from '../utils.js';

export class ResetButtonService {
    #resetButton;

    constructor(resetApp) {
        this.#resetButton = getById('reset');
        this.#resetButton.addEventListener('click', () => {
            resetApp();
            this.#resetButton.blur();
        });
    };
};