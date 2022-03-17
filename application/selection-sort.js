export class SelectionSort {
    animationTime;
    #lst;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    generator = function* () {
        for (let i = 0; i < this.#lst.length; i++) {
            let min = this.#lst[i];
            let min_index = i+1;
            min.fillWithRed();
            for (let j = i+1; j < this.#lst.length; j++) {
                const current = this.#lst[j];
                current.fillWithGreen();
                yield true;
                if(min.value > current.value) {
                    min.fillWithBlue();
                    min = this.#lst[j];
                    min_index = j;
                    min.fillWithRed();
                } else {
                    current.fillWithBlue();
                };
                yield true;
            }
            if(this.#lst[i].value !== min.value) {
                const col1 = this.#lst[i];
                const col2 = min;
                col1.fillWithRed();
                yield true;
                const col_1_x = col1.getCoordinates()[0];
                const col_2_x = col2.getCoordinates()[0];
                col1.animate(col_2_x, this.animationTime);
                col2.animate(col_1_x, this.animationTime);
                const currentElement = this.#lst.splice(min_index, 1);
                this.#lst.splice(i, 0, currentElement[0]);
                const swappedElement = this.#lst.splice(i+1, 1);
                this.#lst.splice(min_index, 0, swappedElement[0]);
                yield true;
                col1.fillWithBlue();
            };
            min.fillWithBlue();
            yield true;
        }
        return this.#lst;
    }

    constructor(svgGroups){
        this.#lst = svgGroups;
    };
};