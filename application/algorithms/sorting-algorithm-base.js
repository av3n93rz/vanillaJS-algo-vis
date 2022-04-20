export class SortingAlgorithmBase {
    animationTime;
    lst;
    counterService;
    order;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    endAnimation = async () => {
        for (const col of this.lst) {
            await this.sleep(2);
            col.fillWith('blue');
        };
    };

    resetSelectedColors = () => {
        this.lst.forEach(col => {
            if(['peach','orange'].includes(col.color)) {
                col.fillWith('blue');
            };
        });
    };

    swap = (arr, num1, num2) => {
        if(num1 !== num2) {
            [arr[num1], arr[num2]] = [arr[num2], arr[num1]];
            const col1 = arr[num2];
            const col2 = arr[num1];
            const col_1_x = col1.getCoordinates()[0];
            const col_2_x = col2.getCoordinates()[0];
            col1.animate(parseFloat(col_1_x), parseFloat(col_1_x) - parseFloat(col_2_x), this.animationTime/2);
            col2.animate(parseFloat(col_2_x), parseFloat(col_2_x) - parseFloat(col_1_x), this.animationTime/2);
            console.log('after')
            this.counterService.setSwap();
        };
    };

    constructor(svgGroups, counterService, order){
        this.lst = svgGroups;
        this.counterService = counterService;
        this.order = order;
    };
};