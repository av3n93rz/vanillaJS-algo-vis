let run = false;
const blockHeight = Math.floor((250 - 20)/100);
const animationTime = 200;
const startButton = document.getElementById('start_pause');
const resetButton = document.getElementById('reset');

const drawChart = (lst) => {
    lst.forEach((value, index) =>{
        const columnHeight = value * blockHeight;
        const y = 240 - columnHeight;
        createColumn(columnHeight, y, index, value)
    })
}

drawChart(randomNumberArrayGenerator());

const sortingFunctionFactory = () => {
    const svgGroups = document.querySelectorAll('g')
    const generatorFunction = bubbleSort(Array.from(svgGroups))
    
    const startInterval = () => {
        const iid = setInterval(()=>{
            if(run){
                generatorFunction.next()
            } else {
                clearInterval(iid)
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
        startButton.innerText = 'Start'
        startButton.classList.remove('btn-danger')
    }
}

const resetChart = () => {
    run = false;
    start_or_pause(run);
    canvas.innerHTML = null;
    drawChart(randomNumberArrayGenerator());
    startInterval = sortingFunctionFactory();
}


window.addEventListener('keypress', (event) => {
    if(event.code === 'Space'){
        run = !run;
        start_or_pause(run)
    }
    if(event.code === 'KeyR'){
        resetChart()
    }
})

startButton.addEventListener('click', () => {
    run = !run;
    start_or_pause(run)
    startButton.blur();
})

reset.addEventListener('click', () => {
    resetChart();
    resetButton.blur();
})