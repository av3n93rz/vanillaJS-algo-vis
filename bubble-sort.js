function* bubbleSort(lst) {
    for (let i = 0; i < lst.length; i++){
        noswaps = true
        for (let j = 0; j < lst.length - i - 1; j++){
            lst[j].childNodes[0].style = 'fill: rgb(0, 216, 0);'
            lst[j+1].childNodes[0].style = 'fill: rgb(0, 216, 0);'
            yield true
            if(Number(lst[j].childNodes[1].textContent) > Number(lst[j+1].childNodes[1].textContent)){
                noswaps = false
                const regex = /[0-9]+/g
                const num1T = lst[j].getAttribute('transform').match(regex)
                const num2T = lst[j+1].getAttribute('transform').match(regex)
                lst[j].animate([
                    { transform: `translate(${num1T[0]}px, ${num1T[1]}px)` },
                    { transform: `translate(${num2T[0]}px, ${num1T[1]}px)` }
                  ], animationTime/2)
                lst[j+1].animate([
                    { transform: `translate(${num2T[0]}px, ${num2T[1]}px)` },
                    { transform: `translate(${num1T[0]}px, ${num2T[1]}px)` }
                  ], animationTime/2)
                lst[j].setAttribute("transform", `translate(${num2T[0]}, ${num1T[1]})`)
                lst[j+1].setAttribute("transform", `translate(${num1T[0]}, ${num2T[1]})`)
                const currentElement = lst.splice(j, 1)
                lst.splice(j+1, 0, currentElement[0])
            }
            yield true
            lst[j].childNodes[0].style = 'fill: rgb(173, 216, 230);'
            lst[j+1].childNodes[0].style = 'fill: rgb(173, 216, 230);'
            yield true
        }
        if(noswaps){
            run = false
            break
        };
    }
    return lst
}