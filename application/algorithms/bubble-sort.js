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
                col1.fillWithTeal();
                col2.fillWithTeal();
                yield;
                this.counterService.setComparison();
                if((col1.value > col2.value && this.order === 'asc') || (col1.value < col2.value && this.order === 'desc')) {
                    noswaps = false;
                    col1.fillWithOrange();
                    yield;
                    this.swap(this.lst, j, j+1);
                    yield;
                    col2.fillWithPeach();
                } else {
                    col2.fillWithOrange();
                    col1.fillWithPeach();
                    yield;
                };
                yield;
            };
            let lastIdx = this.lst.length - 1 - i;
            this.lst[lastIdx].fillWithRed();
            this.resetSelectedColors();
            if(noswaps) {
                while(lastIdx --> 0) {
                    this.lst[lastIdx].fillWithRed();
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