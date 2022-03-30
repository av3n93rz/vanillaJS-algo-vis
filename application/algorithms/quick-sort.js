import { SortingAlgorithmBase } from './sorting-algorithm-base.js';

export class QuickSort extends SortingAlgorithmBase {
    generator = function* (arr = this.lst, l = 0, h = this.lst.length - 1) {
        let stack = new Array(h - l + 1).fill(0);
        let top = -1;
        stack[++top] = l;
        stack[++top] = h;
        while(top >= 0) {
            h = stack[top--];
            l = stack[top--];
            let pivot = arr[h];
            let comp = 0, swap = 0;
            let i = (l - 1);
            pivot.fillWith('teal');
            yield;

            for(let j = l; j <= h - 1; j++) {
                arr[j].fillWith('peach');
                comp++;
                this.counterService.setComparison();
                yield;
                if(
                    (this.order === 'asc' && arr[j].value <= pivot?.value) ||
                    (this.order === 'desc' && arr[j].value > pivot?.value)
                ) {
                    swap++;
                    i++;
                    if(i !== j) {
                        this.swap(arr, j, i);
                        yield;
                        arr[i].fillWith('orange');
                    };
                };
                yield;
            };
            this.swap(arr, i + 1, h);
            yield;
            arr[i+1].fillWith('red');
            if(i+1 === h - 1 || comp === 1) {
                arr[h].fillWith('red');
            };
            if(swap === 1) {
                arr[i].fillWith('red');
            };
            yield;
            this.resetSelectedColors(arr);
            let p = i + 1;
            if(p - 1 > l) {
                stack[++top] = l;
                stack[++top] = p - 1;
            };
            if(p + 1 < h) {
                stack[++top] = p + 1;
                stack[++top] = h;
            };
            yield;
        };

        this.endAnimation();
    };

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};