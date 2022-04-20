export class WindowService {
    #window;
    #speedRangeService;
    #algoSelectService;
    #orderService;

    constructor({
        setAppState,
        resetApp,
        changeColumnNumber,
        speedRangeService,
        algoSelectService,
        orderService,
    }) {
        this.#window = window;
        this.#speedRangeService = speedRangeService;
        this.#algoSelectService = algoSelectService;
        this.#orderService = orderService;

        this.#window.addEventListener('keyup', (event) => {
            switch(event.code){
                case 'Space':
                    setAppState();
                    break;
                case 'KeyR':
                    resetApp();
                    break;
                case 'KeyA':
                    this.#orderService.setOrder('asc');
                    break;
                case 'KeyD':
                    this.#orderService.setOrder('desc');
                    break;
                case 'ArrowRight':
                    if(event.ctrlKey){
                        changeColumnNumber('increase');
                        break;
                    };
                    this.#speedRangeService.decreaseSpeed();
                    break;
                case 'ArrowLeft':
                    if(event.ctrlKey){
                        changeColumnNumber('decrease');
                        break;
                    };
                    this.#speedRangeService.increaseSpeed();
                    break;
                case 'ArrowUp':
                    this.#algoSelectService.changeAlgorithm('prev');
                    break;
                case 'ArrowDown':
                    this.#algoSelectService.changeAlgorithm('next');
                    break;
                default:
                    return;
            };
        });
    };
};