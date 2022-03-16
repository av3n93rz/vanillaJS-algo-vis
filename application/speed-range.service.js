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

    setSortingSpeed = (sortingSpeed) => {
        this.#sortingSpeedLabel.innerText = `Sorting Speed: ${sortingSpeed}ms`;
        this.#animationTime = parseInt(sortingSpeed);
    };

    constructor() {
        this.#sortingSpeedLabel = document.getElementById('sortingSpeedLabel');
        this.#sortingSpeedRange = document.getElementById('sortingSpeedRange');
        this.#animationTime = this.#sortingSpeedRange.value;
        this.#sortingSpeedRange.addEventListener('change', (e) => 
            this.setSortingSpeed(e.target.value)
        );
    };
};