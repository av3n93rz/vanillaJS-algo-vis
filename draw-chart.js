import { createColumn } from './create-column.js'
import { randomNumberArrayGenerator } from './random-number-array-generator.js'

const blockHeight = Math.floor((250 - 20)/100);

export const drawChart = () => {
    const lst = randomNumberArrayGenerator();
    lst.forEach((value, index) => {
        const columnHeight = value * blockHeight;
        const y = 240 - columnHeight;
        createColumn(columnHeight, y, index, value)
    });
}