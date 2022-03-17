export class BubbleSort {
    animationTime;
    #lst;
    #counterService;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    generator = function* () {
        let noswaps = false;
        for (let i = 0; i < this.#lst.length; i++){
            noswaps = true
            for (let j = 0; j < this.#lst.length - i - 1; j++){
                const col1 = this.#lst[j];
                const col2 = this.#lst[j+1];
                col1.fillWithGreen();
                col2.fillWithGreen();
                yield true
                this.#counterService.setComparison();
                if(col1.value > col2.value) {
                    noswaps = false
                    const col_1_x = col1.getCoordinates()[0];
                    const col_2_x = col2.getCoordinates()[0];
                    col1.animate(col_2_x, this.animationTime);
                    col2.animate(col_1_x, this.animationTime);
                    this.#counterService.setSwap();
                    const currentElement = this.#lst.splice(j, 1)
                    this.#lst.splice(j+1, 0, currentElement[0])
                } 
                yield true
                col1.fillWithBlue();
                col2.fillWithBlue();
                yield true
            }
            if(noswaps){
                break
            };
        }
        return this.#lst;
    }

    constructor(svgGroups, counterService){
        this.#lst = svgGroups;
        this.#counterService = counterService;
    };
};