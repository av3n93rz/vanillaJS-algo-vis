export class QuickSort {
    animationTime;
    #lst;
    #counterService;
    #order;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    #sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    #resetSelectedColors = (arr) => {
        arr.forEach(col => {
            if(['peach','orange'].includes(col.color)) {
                col.fillWithBlue();
            };
        });
    };

    #endAnimation = async () => {
        for (const col of this.#lst) {
            await this.#sleep(20);
            col.fillWithBlue();
        };
    };

    #swap = (arr, num1, num2) => {
        [arr[num1], arr[num2]] = [arr[num2], arr[num1]];
        const col1 = arr[num2];
        const col2 = arr[num1];
        const col_1_x = col1.getCoordinates()[0];
        const col_2_x = col2.getCoordinates()[0];
        col1.animate(col_2_x, this.animationTime);
        col2.animate(col_1_x, this.animationTime);
    };

    generator = function* (arr = this.#lst, l = 0, h = this.#lst.length - 1) {
        let stack = new Array(h - l + 1).fill(0);
        let top = -1;
        stack[++top] = l;
        stack[++top] = h;
        while (top >= 0) {
            h = stack[top--];
            l = stack[top--];
            let pivot = arr[h];
            let comp = 0, swap = 0;
            let i = (l - 1);
            pivot.fillWithTeal();
            yield;
            
            for (let j = l; j <= h - 1; j++) {
                arr[j].fillWithPeach();
                comp++;
                this.#counterService.setComparison();
                yield;

                if (
                    (this.#order === 'asc' && arr[j].value <= pivot?.value) ||
                    (this.#order === 'desc' && arr[j].value > pivot?.value)
                ) {
                    swap++;
                    i++;
                    if(i !== j) {
                        this.#swap(arr, j, i);
                        this.#counterService.setSwap();
                        yield;

                        arr[i].fillWithOrange();
                    };
                };
                yield;
            };

            this.#swap(arr, i + 1, h);
            if(h !== i+1) {
                this.#counterService.setSwap();
            };
            yield;

            arr[i+1].fillWithRed();
            if(i+1 === h - 1 || comp === 1) {
                arr[h].fillWithRed();
            };
            if(swap === 1) {
                arr[i].fillWithRed();
            };
            yield;

            this.#resetSelectedColors(arr);
            let p = i + 1;
            if (p - 1 > l) {
                stack[++top] = l;
                stack[++top] = p - 1;
            };
            if (p + 1 < h) {
                stack[++top] = p + 1;
                stack[++top] = h;
            };
            yield;
        };

        this.#endAnimation();
    };

    constructor(svgGroups, counterService, order) {
        this.#lst = svgGroups;
        this.#counterService = counterService;
        this.#order = order;
    };
};