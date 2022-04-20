export class WindowService {
    #window;

    constructor({
        setAppState,
        resetApp,
        changeColumnNumber,
        speedRangeService,
        algoSelectService,
        orderService,
    }) {
        this.#window = window;
        this.#window.addEventListener('keyup', (event) => {
            switch(event.code){
                case 'Space':
                    setAppState();
                    break;
                case 'KeyR':
                    resetApp();
                    break;
                case 'KeyA':
                    orderService.setOrder('asc');
                    break;
                case 'KeyD':
                    orderService.setOrder('desc');
                    break;
                case 'ArrowRight':
                    if(event.ctrlKey){
                        changeColumnNumber('increase');
                        break;
                    };
                    speedRangeService.decreaseSpeed();
                    break;
                case 'ArrowLeft':
                    if(event.ctrlKey){
                        changeColumnNumber('decrease');
                        break;
                    };
                    speedRangeService.increaseSpeed();
                    break;
                case 'ArrowUp':
                    algoSelectService.changeAlgorithm('prev');
                    break;
                case 'ArrowDown':
                    algoSelectService.changeAlgorithm('next');
                    break;
                default:
                    return;
            };
        });
    };
};