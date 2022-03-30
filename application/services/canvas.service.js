import { ColumnService } from './column.service.js';
import { getById } from '../utils.js';

export class CanvasService {
    #canvas;
    #blockHeight = Math.floor((250 - 20)/100);

    #generateArray = () => new Array(15).fill(null).map(() => Math.ceil((Math.random() * 100)));

    #drawChart = () => {
        const lst = this.#generateArray();
        return lst.map((value, index) => {
            const columnHeight = value * this.#blockHeight;
            const y = 240 - columnHeight;
            return new ColumnService(this.#canvas, {columnHeight, y, index, value});
        });
    };

    resetCanvas = () => {
        this.#canvas.innerHTML = null;
        return this.#drawChart();
    };

    constructor() {
        this.#canvas = getById('canvas');
    };
};