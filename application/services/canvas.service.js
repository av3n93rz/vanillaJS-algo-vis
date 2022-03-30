import { ColumnService } from './column.service.js';
import { getById } from '../utils.js';

export class CanvasService {
    #canvas;
    columnNumber = 20;
    #blockHeight = Math.floor((250 - 20)/100);

    #generateArray = () => new Array(this.columnNumber).fill(null).map(() => Math.ceil((Math.random() * 100)));

    #drawChart = () => {
        const columnWidth = 800 / (this.columnNumber + ((this.columnNumber + 1) / 4));
        const spaceWidth = (800 - (this.columnNumber * columnWidth)) / (this.columnNumber + 1);
        const lst = this.#generateArray();
        return lst.map((value, index) => {
            const columnHeight = value * this.#blockHeight;
            const y = 240 - columnHeight;
            return new ColumnService(this.#canvas, {columnHeight, y, index, value, columnWidth, spaceWidth});
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