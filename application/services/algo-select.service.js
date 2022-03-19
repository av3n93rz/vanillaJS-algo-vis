import { BubbleSort } from '../algorithms/bubble-sort.js';
import { SelectionSort } from '../algorithms/selection-sort.js';
import { QuickSort } from '../algorithms/quick-sort.js';
import { PatienceSort } from '../algorithms/patience-sort.js';

export class AlgoSelectService {
    #algoSelect;
    #resetApp;

    blur = () => {
        this.#algoSelect.blur();
    };

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
        }
    }

    #getSelectedOptionsIndex = () => {
        return Array.from(this.#algoSelect.children).findIndex((element) => element.selected);
    };

    changeUp = () => {
        const currentIndex = this.#getSelectedOptionsIndex();
        if(currentIndex > 0) {
            this.#algoSelect.value = this.#algoSelect.children[currentIndex-1].value;
            this.#resetApp();
        };
    };

    changeDown = () => {
        const currentIndex = this.#getSelectedOptionsIndex();
        const optionsCount = this.#algoSelect.children.length;
        if(currentIndex < optionsCount - 1) {
            this.#algoSelect.value = this.#algoSelect.children[currentIndex+1].value;
            this.#resetApp();
        };
    };

    setSelectedAlgorithm = (algorithmName) => {
        this.#algoSelect.value = algorithmName;
    }

    constructor(resetApp) {
        this.#resetApp = resetApp;
        this.#algoSelect = document.getElementById('algoSelect');
        this.#algoSelect.addEventListener('change', () => {
            this.blur();
        });
        this.#algoSelect.addEventListener('change', () => {
            resetApp();
        });
    };
};