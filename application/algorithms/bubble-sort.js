import { SortingAlgorithmBase } from './sorting-algorithm-base.js';

export class BubbleSort extends SortingAlgorithmBase {
    generator = function* () {
        let noswaps = false;
        for(let i = 0; i < this.lst.length; i++) {
            noswaps = true;
            let col1;
            let col2;
            for(let j = 0; j < this.lst.length - i - 1; j++) {
                col1 = this.lst[j];
                col2 = this.lst[j+1];
                col1.fillWith('teal');
                col2.fillWith('teal');
                yield;
                this.counterService.setComparison();
                if((col1.value > col2.value && this.order === 'asc') || (col1.value < col2.value && this.order === 'desc')) {
                    noswaps = false;
                    col1.fillWith('orange');
                    yield;
                    this.swap(this.lst, j, j+1);
                    yield;
                    col2.fillWith('peach');
                } else {
                    col2.fillWith('orange');
                    col1.fillWith('peach');
                    yield;
                };
                yield;
            };
            let lastIdx = this.lst.length - 1 - i;
            this.lst[lastIdx].fillWith('red');
            this.resetSelectedColors();
            if(noswaps) {
                while(lastIdx --> 0) {
                    this.lst[lastIdx].fillWith('red');
                    yield;
                };
                break;
            };
        };

        this.endAnimation();
    };

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};