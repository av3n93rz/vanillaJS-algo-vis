export class ColumnService {
    #column;
    value;
    coordinates;
    #svgns = "http://www.w3.org/2000/svg";
    color;
    colors = {
        green: 'rgb(0, 216, 0)',
        blue: 'rgb(173, 216, 230)',
        red: 'rgb(188, 65, 43)',
        peach: 'rgb(215, 180, 158)',
        orange: 'rgb(220, 96, 46)',
        teal: 'rgb(5, 168, 170)'
    };

    #createSVGElement = (svgTag, options = {}) => {
        const element = document.createElementNS(this.#svgns, svgTag)
        Object.entries(options).forEach(([key, value]) => {
            if(key === 'text') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            };
        });

        return element;
    };

    fillWith = (color) => {
        this.#column.style.fill = this.colors[color];
        this.color = color;
    }

    animate = ( origin, destX, animationTime ) => {
        const timing = (fraction) => destX * fraction
        const draw = (progress) => {
            this.setCoordinates((progress * -1) + origin)
        }
        const start = performance.now();
      
        const animateLoop = (time) => {
          const durationFraction = Math.min(1, Math.max(0, (time - start) / animationTime));
          const progress = timing(durationFraction);
          draw(progress);
          if (durationFraction < 1) {
            requestAnimationFrame(animateLoop);
          } else {
            this.setCoordinates((destX * -1) + origin)
          }
        };
        requestAnimationFrame(animateLoop);
    };

    getCoordinates = () => this.#column.style.transform.match(/[0-9]*[.]?[0-9]+|[0-9]+[.]?[0-9]*/g);

    setCoordinates = (X) => {
        this.#column.style.transform = `translate(${X}%, ${this.coordinates[1]}px)`;
        this.coordinates = this.getCoordinates();
    };

    #createColumn = (canvas, { columnHeight, y, index, value, columnWidth, spaceWidth, percent }) => {
        const fontSize = columnWidth > 27 ? 16 : 10;

        const rect = this.#createSVGElement('rect', {
            width: `${percent}%`,
            height: columnHeight,
            style: `fill: ${this.colors.blue}; transform: translate(${(spaceWidth + (spaceWidth + percent) * index)}%, ${y}px)`,
        });

        const text = this.#createSVGElement('text', {
            text: value.toString(),
            style: `
                font-size: ${fontSize}px;
                fill: black;
                transform: translate(${(spaceWidth + (spaceWidth + percent) * index)+ (percent/2)}%, ${columnHeight + y -5}px)`,
            'text-anchor': 'middle'
        });

        const g = this.#createSVGElement('g');

        g.appendChild(rect);
        //g.appendChild(text);
        canvas.appendChild(g);
        return rect;
    };

    constructor(canvas, { columnHeight, y, index, value, columnWidth, spaceWidth, percent }) {
        this.color = 'blue';
        this.#column = this.#createColumn(canvas, { columnHeight, y, index, value, columnWidth, spaceWidth, percent })
        this.value = value;
        this.coordinates = this.getCoordinates();
    };
};