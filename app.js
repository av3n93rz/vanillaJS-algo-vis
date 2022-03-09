import { BubbleSort } from './bubble-sort.js'
import { drawChart } from './draw-chart.js'
import { SortingFunctionFactory } from './sorting-factory.js'

export class SortingApplication {
    startButton = document.getElementById('start_pause');
    resetButton = document.getElementById('reset');
    sortingSpeedRange = document.getElementById('sortingSpeedRange');
    sortingSpeedLabel = document.getElementById('sortingSpeedLabel');
    canvas = document.getElementById('canvas');
    animationTime = sortingSpeedRange.value;
    run = false;
    svgGroups;
    generatorFunction;
    sortingAlgorythm;

    setRun = (run) => {
        this.run = run;
        this.setRangerDisability(run);
        this.startApplication();
    }

    setButtonToStart = () => {
        this.startButton.innerText = 'Start';
        this.startButton.classList.remove('btn-danger');
    }

    startApplication = () => {
        if(this.run){
            this.startButton.innerText = 'Pause'
            this.sortingFunctionFactory.setRun(this.run);
            this.sortingFunctionFactory.startInterval();
            this.startButton.classList.add('btn-danger')
        } else {
            this.sortingFunctionFactory.setRun(this.run);
            this.setButtonToStart();
        }
    }

    setRangerDisability = (isDisabled) => {
        if(isDisabled){
            this.sortingSpeedRange.setAttribute('disabled', true);
        } else {
            this.sortingSpeedRange.removeAttribute('disabled');
        }
    }
    
    setSortingSpeed = (sortingSpeed) => {
        this.sortingSpeedLabel.innerText = `Sorting Speed: ${sortingSpeed}ms`
        this.animationTime = parseInt(sortingSpeed)
        this.sortingFunctionFactory.setAnimationTime(this.animationTime)
        this.sortingAlgorythm.setAnimationTime(this.animationTime)
    }

    resetChart = () => {
        this.setRun(false);
        this.canvas.innerHTML = null;
        drawChart();
        this.svgGroups = document.querySelectorAll('g')
        this.sortingAlgorythm = new BubbleSort(this.animationTime);
        this.generatorFunction = this.sortingAlgorythm.bubbleSort(Array.from(this.svgGroups))
        this.sortingFunctionFactory = new SortingFunctionFactory(
            this.startButton,
            this.setButtonToStart,
            this.run,
            this.animationTime,
            this.generatorFunction,
            this.setRun,
        );
        this.startButton.removeAttribute('disabled');
    }

    constructor(){
        drawChart();

        this.svgGroups = document.querySelectorAll('g')
        this.sortingAlgorythm = new BubbleSort(this.animationTime);
        this.generatorFunction = this.sortingAlgorythm.bubbleSort(Array.from(this.svgGroups))
        this.sortingFunctionFactory = new SortingFunctionFactory(
            this.startButton,
            this.setButtonToStart,
            this.run,
            this.animationTime,
            this.generatorFunction,
            this.setRun,
        );
        
        window.addEventListener('keypress', (event) => {
            if(event.code === 'Space'){
                this.setRun(!this.run);
            }
            if(event.code === 'KeyR'){
                this.resetChart()
            }
        })
        
        this.sortingSpeedRange.addEventListener('change', (e) => this.setSortingSpeed(e.target.value))
        
        this.startButton.addEventListener('click', () => {
            this.setRun(!this.run);
            this.startButton.blur();
        })
        
        this.resetButton.addEventListener('click', () => {
            this.resetChart();
            this.resetButton.blur();
        })
    }
}