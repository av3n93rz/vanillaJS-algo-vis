import { SortingAlgorithmBase } from './sorting-algorithm-base.js'

export class BubbleSort extends SortingAlgorithmBase {

    generator = function* () {
        let noswaps = false;
        for (let i = 0; i < this.lst.length; i++){
            noswaps = true
            for (let j = 0; j < this.lst.length - i - 1; j++){
                const col1 = this.lst[j];
                const col2 = this.lst[j+1];
                col1.fillWithGreen();
                col2.fillWithGreen();
                yield;
                this.counterService.setComparison();
                if((col1.value > col2.value && this.order === 'asc') || (col1.value < col2.value && this.order === 'desc')) {
                    noswaps = false
                    this.swap(this.lst, j, j+1)
                } 
                yield;
                col1.fillWithBlue();
                col2.fillWithBlue();
                yield;
            }
            if(noswaps){
                break
            };
        }
        return this.lst;
    }

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};