export class ParamService {

    #parameterValidation = (key, value) => {
        const algorithms = ['quickSort', 'selectionSort', 'bubbleSort', 'patienceSort']
        switch(key){
            case 'start':
                if(value === 'true'){
                    return true;
                } else {
                    return false;
                };
            case 'a':
                if(algorithms.includes(value)){
                    return value;
                } else {
                    return false;
                };
            case 's':
                const val = Number(value);
                if(!isNaN(val)) {
                    if(val < 0) {
                        return 0;
                    } else if (val > 2000) {
                        return 2000;
                    } else {
                        return Math.round(val/100)*100;
                    };
                } else {
                    return false;
                };
            case 'o':
                const order = value.toLowerCase()
                if(order === 'asc' || order === 'desc'){
                    return order
                } else {
                    return false;
                }
            default: 
                return false;
        }
    }

    #initParams = () => {
        return document.location.search.slice(1).split('&').reduce((acc, cur) => {
            const [key, value] = cur.split('=');
            const validity = this.#parameterValidation(key, value);
            if( validity !== false) {
                acc[key] = validity;
            }
            return acc;
        }, {
            start: false,
            a: 'bubbleSort',
            s: 200,
            o: 'asc',
        });
    };

    constructor() {
        this.params = this.#initParams();
    };
};