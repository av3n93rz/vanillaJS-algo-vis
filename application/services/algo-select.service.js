import { BubbleSort } from '../algorithms/bubble-sort.js';
import { SelectionSort } from '../algorithms/selection-sort.js';
import { QuickSort } from '../algorithms/quick-sort.js';
import { PatienceSort } from '../algorithms/patience-sort.js';
import { getById } from '../utils.js';

export class AlgoSelectService {
    #algoSelect;
    #resetApp;

    getSelectedAlgorithm = () => {
        switch(this.#algoSelect.value) {
            case 'selectionSort':
                return SelectionSort
            case 'quickSort':
                return QuickSort
            case 'patienceSort':
                return PatienceSort
            default:
                return BubbleSort;
        };
    };

    changeAlgorithm = (direction) => {
        const currentIndex = Array
            .from(this.#algoSelect.children)
            .findIndex((element) => element.selected);

        const optionsCount = this.#algoSelect.children.length;
        const newIndex = currentIndex + (direction === 'prev' ? -1 : 1);

        if(newIndex > optionsCount - 1 || newIndex < 0) {
            return;
        };

        this.#algoSelect.value = this.#algoSelect.children[newIndex].value;
        this.#resetApp();
    };

    setSelectedAlgorithm = (algorithmName) => {
        this.#algoSelect.value = algorithmName;
    }

    constructor(resetApp) {
        this.#resetApp = resetApp;
        this.#algoSelect = getById('algoSelect');
        this.#algoSelect.addEventListener('change', () => {
            this.#algoSelect.blur();
        });
        this.#algoSelect.addEventListener('change', () => {
            resetApp();
        });
    };
};