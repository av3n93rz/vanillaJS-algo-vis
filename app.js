let run = false;
const blockHeight = Math.floor((250 - 20)/100);
const startButton = document.getElementById('start_pause');
const resetButton = document.getElementById('reset');
const sortingSpeedRange = document.getElementById('sortingSpeedRange');
const sortingSpeedLabel = document.getElementById('sortingSpeedLabel');
let animationTime = sortingSpeedRange.value;

const drawChart = (lst) => {
    lst.forEach((value, index) =>{
        const columnHeight = value * blockHeight;
        const y = 240 - columnHeight;
        createColumn(columnHeight, y, index, value)
    })
}

drawChart(randomNumberArrayGenerator());

const setButtonToStart = () => {
    startButton.innerText = 'Start';
    startButton.classList.remove('btn-danger');
}

const sortingFunctionFactory = () => {
    const svgGroups = document.querySelectorAll('g')
    const generatorFunction = bubbleSort(Array.from(svgGroups))
    
    const startInterval = () => {
        const iid = setInterval(()=>{
            let isDone
            if(run){
                const { done } = generatorFunction.next()
                isDone = done;
            } else {
                clearInterval(iid);
                setButtonToStart();
            }
            if(isDone){
                startButton.setAttribute('disabled', true);
            }
        }, animationTime)
    }

    return startInterval;
}

let startInterval = sortingFunctionFactory();

const start_or_pause = (run) => {
    if(run){
        startButton.innerText = 'Pause'
        startInterval();
        startButton.classList.add('btn-danger')
    } else {
        setButtonToStart();
    }
}

const setRangerDisability = (isDisabled) => {
    if(isDisabled){
        sortingSpeedRange.setAttribute('disabled', true);
    } else {
        sortingSpeedRange.removeAttribute('disabled');
    }
}

const resetChart = () => {
    run = false;
    setRangerDisability(run);
    start_or_pause(run);
    canvas.innerHTML = null;
    drawChart(randomNumberArrayGenerator());
    startInterval = sortingFunctionFactory();
    startButton.removeAttribute('disabled');
}

const setSortingSpeed = (sortingSpeed) => {
    sortingSpeedLabel.innerText = `Sorting Speed: ${sortingSpeed}ms`
    animationTime = parseInt(sortingSpeed)
}

window.addEventListener('keypress', (event) => {
    if(event.code === 'Space'){
        run = !run;
        setRangerDisability(run);
        start_or_pause(run);
    }
    if(event.code === 'KeyR'){
        resetChart()
    }
})

sortingSpeedRange.addEventListener('change', (e) => setSortingSpeed(e.target.value))

startButton.addEventListener('click', () => {
    run = !run;
    setRangerDisability(run);
    start_or_pause(run)
    startButton.blur();
})

reset.addEventListener('click', () => {
    resetChart();
    resetButton.blur();
})