import { getById } from '../utils.js';

export class StartButtonService {
    #startButton;

    setDisabled = (isDisabled) => {
        if(isDisabled){
            this.#startButton.setAttribute('disabled', isDisabled);
            return;
        };
        this.#startButton.removeAttribute('disabled');
    };

    setToStart = () => {
        this.#startButton.innerText = 'Start';
        this.#startButton.classList.remove('btn-danger');
    };

    setToPause = () => {
        this.#startButton.innerText = 'Pause';
        this.#startButton.classList.add('btn-danger');
    };

    constructor(appStateSetter) {
        this.#startButton = getById('start_pause');
        this.#startButton.addEventListener('click', () => {
            appStateSetter();
            this.#startButton.blur();
        });
    };
};