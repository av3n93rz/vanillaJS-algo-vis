export class WindowService {
    #window;
    #speedRangeService;
    #algoSelectService;
    #orderService;

    constructor({
        setAppState,
        resetApp,
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
                    this.#speedRangeService.decreaseSpeed();
                    break;
                case 'ArrowLeft':
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