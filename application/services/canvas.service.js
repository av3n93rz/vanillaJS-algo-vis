import { ColumnService } from './column.service.js';
import { getById } from '../utils.js';

export class CanvasService {
    #canvas;
    #blockHeight = Math.floor((250 - 20)/100);

    #drawChart = (columnNumber) => {
        const columnWidth = 800 / (columnNumber + ((columnNumber + 1) / 4));
        const spaceWidth = (800 - (columnNumber * columnWidth)) / (columnNumber + 1);
        const lst = new Array(columnNumber).fill(null).map(() => Math.ceil((Math.random() * 100)));
        return lst.map((value, index) => {
            const columnHeight = value * this.#blockHeight;
            const y = 240 - columnHeight;
            return new ColumnService(this.#canvas, {columnHeight, y, index, value, columnWidth, spaceWidth});
        });
    };

    resetCanvas = (columnNumber = 15) => {
        this.#canvas.innerHTML = null;
        return this.#drawChart(columnNumber);
    };

    constructor() {
        this.#canvas = getById('canvas');
    };
};