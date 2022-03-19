export class PatienceSort {
    animationTime;
    #lst;
    #counterService;
    #order;

    setAnimationTime = (animationTime) => {
        this.animationTime = animationTime
    }

    #sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    generator = function* (arr = this.#lst) {
            const piles = []
            for (let i = 0; i < arr.length; i++) {
              const num = arr[i]
              num.fillWithPeach();
              yield;
              this.#counterService.setComparison();
              const destinationPileIndex = piles.findIndex(
                (pile) => num.value >= pile[pile.length - 1].value
              )
              if (destinationPileIndex === -1) {
                piles.push([num])
              } else {
                piles[destinationPileIndex].push(num)
              }
              num.fillWithOrange();
              yield;
            }

            const tmp = [];
           
            for (let i = 0; i < arr.length; i++) {
              let destinationPileIndex = 0
              for (let p = 1; p < piles.length; p++) {
                const pile = piles[p]
                this.#counterService.setComparison();
                if (
                    (pile[0].value < piles[destinationPileIndex][0].value && this.#order === 'asc') ||
                    (pile[pile.length -1].value > piles[destinationPileIndex][piles[destinationPileIndex].length -1].value && this.#order === 'desc')
                ) {
                    destinationPileIndex = p
                }
            }
                const distPile = piles[destinationPileIndex]
                if(this.#order === 'asc') {
                    tmp[i] = distPile.shift();
                } else {
                    tmp[i] = distPile.pop();
                }
                tmp[i].fillWithRed();
                yield;
                if (distPile.length === 0) {
                    piles.splice(destinationPileIndex, 1)
                }
            }

            for (let i = 0; i < tmp.length; i++){
                const tmp_val = tmp[i];
                if(this.#lst[i].value !== tmp_val.value){
                    const originalIndex = this.#lst.findIndex((col, index) => col.value === tmp_val.value && index > i)
                    if( originalIndex >= 0){
                        this.#counterService.setSwap();
                        this.#swap(this.#lst, i, originalIndex)
                        yield;
                    }
                };
            };

            this.#endAnimation();
    };

    constructor(svgGroups, counterService, order){
        this.#lst = svgGroups;
        this.#counterService = counterService;
        this.#order = order;
    };
};