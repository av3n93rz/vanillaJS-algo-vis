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
            pivot.fillWithTeal();
            yield;

            for(let j = l; j <= h - 1; j++) {
                arr[j].fillWithPeach();
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
                        arr[i].fillWithOrange();
                    };
                };
                yield;
            };
            this.swap(arr, i + 1, h);
            yield;
            arr[i+1].fillWithRed();
            if(i+1 === h - 1 || comp === 1) {
                arr[h].fillWithRed();
            };
            if(swap === 1) {
                arr[i].fillWithRed();
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