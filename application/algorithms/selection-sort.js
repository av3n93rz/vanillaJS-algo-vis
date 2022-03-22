import { SortingAlgorithmBase } from './sorting-algorithm-base.js';

export class SelectionSort extends SortingAlgorithmBase {
    generator = function* () {
        for(let i = 0; i < this.lst.length; i++) {
            let min = this.lst[i];
            let min_index = i+1;
            min.fillWithOrange();
            for(let j = i+1; j < this.lst.length; j++) {
                const current = this.lst[j];
                current.fillWithTeal();
                yield;
                this.counterService.setComparison();
                if((min.value > current.value && this.order === 'asc') || (min.value < current.value && this.order === 'desc')) {
                    min.fillWithPeach();
                    min = this.lst[j];
                    min_index = j;
                    min.fillWithOrange();
                } else {
                    current.fillWithPeach();
                };
                yield;
            }
            if(this.lst[i].value !== min.value) {
                this.lst[i].fillWithOrange();
                yield;
                this.swap(this.lst, i, min_index);
                yield;
            };
            this.lst[i].fillWithRed();
            yield;
            this.resetSelectedColors();
            yield;
        };

        this.endAnimation();
    };

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};