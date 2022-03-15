import { BubbleSort } from './bubble-sort.js'
import { drawChart } from './draw-chart.js'
import { SortingFunctionFactory } from './sorting-factory.js'
import { StartButtonService } from './start-button.service.js'

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

    setRun = (isRunning) => {
        this.run = isRunning ?? !this.run;
        this.setRangerDisability(this.run);
        if(this.run){
            this.startButtonService.setToPause();
            this.sortingFunctionFactory.setRunInterval(this.run);
            this.sortingFunctionFactory.startInterval();
        } else {
            this.sortingFunctionFactory.setRunInterval(this.run);
            this.startButtonService.setToStart();
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

    resetChart = (isInit) => {
        if(!isInit){
            this.setRun(false);
        }
        this.canvas.innerHTML = null;
        drawChart();
        this.svgGroups = document.querySelectorAll('g')
        this.sortingAlgorythm = new BubbleSort(this.animationTime);
        this.generatorFunction = this.sortingAlgorythm.bubbleSort(Array.from(this.svgGroups))
        this.sortingFunctionFactory = new SortingFunctionFactory(
            this.startButtonService,
            this.run,
            this.animationTime,
            this.generatorFunction,
            this.setRun,
        );
        this.startButtonService.setDisabled(false);
    }

    constructor(){
        this.startButtonService = new StartButtonService();
        this.resetChart(true);
        
        window.addEventListener('keypress', (event) => {
            if(event.code === 'Space'){
                this.setRun();
            }
            if(event.code === 'KeyR'){
                this.resetChart()
            }
        })
        
        this.sortingSpeedRange.addEventListener('change', (e) => this.setSortingSpeed(e.target.value))
        
        this.startButton.addEventListener('click', () => {
            this.setRun();
            this.startButtonService.blur();
        })
        
        this.resetButton.addEventListener('click', () => {
            this.resetChart();
            this.resetButton.blur();
        })
    }
}