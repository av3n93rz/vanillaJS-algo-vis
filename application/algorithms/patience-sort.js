import { SortingAlgorithmBase } from './sorting-algorithm-base.js';

export class PatienceSort extends SortingAlgorithmBase {
    generator = function* () {
        const arr = this.lst;
        const piles = [];

        for(let i = 0; i < arr.length; i++) {
            const num = arr[i];
            num.fillWith('teal');
            yield;
            this.counterService.setComparison();
            const destinationPileIndex = piles.findIndex(
                pile => num.value >= pile[pile.length - 1].value
            );
            if(destinationPileIndex === -1) {
                piles.push([num]);
            } else {
                piles[destinationPileIndex].push(num);
            };
            num.fillWith('peach');
            yield;
        };

        const tmp = [];
        
        for(let i = 0; i < arr.length; i++) {
            let destinationPileIndex = 0

            for(let p = 1; p < piles.length; p++) {
                const pile = piles[p];
                this.counterService.setComparison();
                if(
                    (pile[0].value < piles[destinationPileIndex][0].value && this.order === 'asc') ||
                    (pile[pile.length -1].value > piles[destinationPileIndex][piles[destinationPileIndex].length -1].value && this.order === 'desc')
                ) {
                    destinationPileIndex = p
                };
            };

            const distPile = piles[destinationPileIndex];
            if(this.order === 'asc') {
                tmp[i] = distPile.shift();
            } else {
                tmp[i] = distPile.pop();
            };
            tmp[i].fillWith('orange');
            yield;
            if(distPile.length === 0) {
                piles.splice(destinationPileIndex, 1);
            };
        };

        for(let i = 0; i < tmp.length; i++) {
            const tmp_val = tmp[i];
            if(this.lst[i].value !== tmp_val.value) {
                const originalIndex = this.lst.findIndex((col, index) => index > i && col.value === tmp_val.value);
                if(originalIndex >= 0) {
                    this.swap(this.lst, i, originalIndex)
                    yield;
                };
            };
            this.lst[i].fillWith('red');
            yield;
        };

        this.endAnimation();
    };

    constructor(svgGroups, counterService, order) {
        super(svgGroups, counterService, order);
    };
};