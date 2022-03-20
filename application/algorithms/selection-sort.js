import { SortingAlgorithmBase } from './sorting-algorithm-base.js'

export class SelectionSort extends SortingAlgorithmBase {

    generator = function* () {
        for (let i = 0; i < this.lst.length; i++) {
            let min = this.lst[i];
            let min_index = i+1;
            min.fillWithRed();
            for (let j = i+1; j < this.lst.length; j++) {
                const current = this.lst[j];
                current.fillWithGreen();
                yield;
                this.counterService.setComparison();
                if((min.value > current.value && this.order === 'asc') || (min.value < current.value && this.order === 'desc')) {
                    min.fillWithBlue();
                    min = this.lst[j];
                    min_index = j;
                    min.fillWithRed();
                } else {
                    current.fillWithBlue();
                };
                yield;
            }
            if(this.lst[i].value !== min.value) {
                this.lst[i].fillWithRed();
                yield;
                this.swap(this.lst, i, min_index)
                yield;
                this.lst[i].fillWithBlue();
            };
            min.fillWithBlue();
            yield;
        }
        return this.lst;
    }

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};