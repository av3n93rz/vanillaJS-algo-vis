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

    blur = () => {
        this.#startButton.blur();
    };

    constructor(appStateSetter) {
        this.#startButton = document.getElementById('start_pause');
        this.#startButton.addEventListener('click', () => {
            appStateSetter();
            this.blur();
        });
    };
};