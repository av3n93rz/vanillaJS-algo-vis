export class CounterService {
    #swap;
    #comparison;

    setComparison = () => {
        this.#comparison.innerText = Number(this.#comparison.innerText) + 1;
    };

    setSwap = () => {
        this.#swap.innerText = Number(this.#swap.innerText) + 1;
    };

    clearValues = () => {
        this.#comparison.innerText = '0';
        this.#swap.innerText = '0';
    }

    constructor() {
        this.#swap = document.getElementById('swap');
        this.#comparison = document.getElementById('comparison');
    };
};