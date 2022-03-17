import { BubbleSort } from './bubble-sort.js';
import { SelectionSort } from './selection-sort.js';

export class AlgoSelectService {
    #algoSelect;
    #isOpen

    blur = () => {
        this.#algoSelect.blur();
    };

    getSelectedAlgorithm = () => {
        switch(this.#algoSelect.value) {
            case 'selectionSort':
                return SelectionSort
            default:
                return BubbleSort;
        }
    }

    constructor(resetApp) {
        this.#isOpen = false;
        this.#algoSelect = document.getElementById('algoSelect');
        this.#algoSelect.addEventListener('mouseup', () => {
            this.#isOpen = !this.#isOpen;
            if(!this.#isOpen) {
                this.blur();
            };
        });
        this.#algoSelect.addEventListener('change', () => {
            resetApp();
        });
    };
};