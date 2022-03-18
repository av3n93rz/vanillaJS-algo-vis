export class QuickSort {
    animationTime;
    #lst;
    #counterService;
    #order;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    generator = function* (arr = this.#lst, l = 0, h = this.#lst.length - 1) {
        let stack = new Array(h - l + 1).fill(0);
        let top = -1;
        stack[++top] = l;
        stack[++top] = h;
        while (top >= 0) {
            h = stack[top--];
            l = stack[top--];
            let temp;
            let pivot = arr[h];
            let comp = 0;
            let swap = 0;
            arr[h].fillWithTeal();
            yield true;
            let i = (l - 1);
            for (let j = l; j <= h - 1; j++) {
                comp++
                yield true
                arr[j].fillWithPeach();
                if ((this.#order === 'asc' && arr[j].value <= pivot?.value) || (this.#order === 'desc' && arr[j].value > pivot?.value)) {
                        swap++
                        i++;
                        if(i !== j){
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                            const col1 = arr[i];
                            const col2 = arr[j];
                            const col_1_x = col1.getCoordinates()[0];
                            const col_2_x = col2.getCoordinates()[0];
                            col1.animate(col_2_x, this.animationTime);
                            col2.animate(col_1_x, this.animationTime);
                            yield true;
                            arr[i].fillWithOrange();
                        }
                }
                yield true;
            }
            yield true;
            temp = arr[i + 1];
            arr[i + 1] = arr[h];
            arr[h] = temp;
            const col1 = arr[i +1];
            const col2 = arr[h];
            const col_1_x = col1.getCoordinates()[0];
            const col_2_x = col2.getCoordinates()[0];
            col1.animate(col_2_x, this.animationTime);
            col2.animate(col_1_x, this.animationTime);
            yield true;
            arr[i+1].fillWithRed();
            if(i+1 === h - 1 || comp === 1) {
                arr[h].fillWithRed();
            }
            if(swap === 1) {
                arr[i].fillWithRed();
            }
            yield true
            arr.forEach(col => {
                if(col.color === 'peach' || col.color === 'orange'){
                    col.fillWithBlue();
                }
            })
            let p = i + 1;
            if (p - 1 > l) {
                stack[++top] = l;
                stack[++top] = p - 1;
            }
            if (p + 1 < h) {
                stack[++top] = p + 1;
                stack[++top] = h;
            }
            yield true;
        };

        (async () => {
            for (const col of this.#lst) {
                await this.sleep(20)
                col.fillWithBlue();
            };
        })();
    }

    constructor(svgGroups, counterService, order){
        this.#lst = svgGroups;
        this.#counterService = counterService;
        this.#order = order;
    };
};