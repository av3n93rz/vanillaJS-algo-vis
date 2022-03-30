import { getById } from '../utils.js';

export class OrderService {
    #asc;
    #desc;
    #order;

    setOrder = (order) => {
        this.#order = order;
        if(order === 'asc') {
            this.#asc.classList.add('btn-success');
            this.#asc.classList.add('selectedOrder');
            this.#asc.classList.remove('btn-light');
            this.#desc.classList.remove('btn-success');
            this.#desc.classList.remove('selectedOrder');
            this.#desc.classList.add('btn-light');
        };
        if(order === 'desc') {
            this.#asc.classList.remove('btn-success');
            this.#asc.classList.remove('selectedOrder');
            this.#asc.classList.add('btn-light');
            this.#desc.classList.add('btn-success');
            this.#desc.classList.add('selectedOrder');
            this.#desc.classList.remove('btn-light');
        };
    };

    getOrder = () => this.#order;

    constructor(resetApp) {
        this.#asc = getById('asc');
        this.#desc = getById('desc');
        this.#order = 'asc';
        this.#asc.addEventListener('click', () => {
            this.#asc.blur();
            this.setOrder('asc');
            resetApp();
        })
        this.#desc.addEventListener('click', () => {
            this.#desc.blur();
            this.setOrder('desc');
            resetApp();
        })
    };
};