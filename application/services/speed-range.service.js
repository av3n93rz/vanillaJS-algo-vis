import { getById } from '../utils.js';

export class SpeedRangeService {
    #sortingSpeedRange;
    #sortingSpeedLabel;
    #animationTime;

    getAnimationTime = () => this.#animationTime;

    setDisability = (isDisabled) => {
        if(isDisabled) {
            this.#sortingSpeedRange.setAttribute('disabled', true);
        } else {
            this.#sortingSpeedRange.removeAttribute('disabled');
        };
    };

    #getDisability = () => this.#sortingSpeedRange.getAttribute('disabled');

    setSortingSpeed = (sortingSpeed) => {
        this.#sortingSpeedLabel.innerText = `Sorting Speed: ${sortingSpeed}ms`;
        this.#animationTime = parseInt(sortingSpeed);
        this.#sortingSpeedRange.value = sortingSpeed;
    };

    increaseSpeed = () => {
        const isDisabled = this.#getDisability();
        const currentSpeed = Number(this.#animationTime);
        if(currentSpeed > 0 && !isDisabled) {
            const newValue = currentSpeed - 100;
            this.setSortingSpeed(newValue);
        };
    };

    decreaseSpeed = () => {
        const isDisabled = this.#getDisability();
        const currentSpeed = Number(this.#animationTime);
        if(currentSpeed < 2000 && !isDisabled) {
            const newValue = currentSpeed + 100;
            this.setSortingSpeed(newValue);
        };
    };

    constructor() {
        this.#sortingSpeedLabel = getById('sortingSpeedLabel');
        this.#sortingSpeedRange = getById('sortingSpeedRange');
        this.#animationTime = this.#sortingSpeedRange.value;
        this.#sortingSpeedRange.addEventListener('change', (e) => 
            this.setSortingSpeed(e.target.value)
        );
    };
};