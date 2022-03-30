export class ColumnService {
    #column;
    value;
    coordinates;
    #svgns = "http://www.w3.org/2000/svg";
    color;
    colors = {
        green: 'fill: rgb(0, 216, 0)',
        blue: 'fill: rgb(173, 216, 230)',
        red: 'fill: rgb(188, 65, 43)',
        peach: 'fill: rgb(215, 180, 158)',
        orange: 'fill: rgb(220, 96, 46)',
        teal: 'fill: rgb(5, 168, 170)'
    };

    #createSVGElement = (svgTag, options = {}) => {
        const element = document.createElementNS(this.#svgns, svgTag)
        Object.entries(options).forEach(([key, value]) => {
            if(key === 'text') {
                element.textContent = value;
            };

            element.setAttribute(key, value);
        });

        return element;
    };

    fillWith = (color) => {
        this.#column.childNodes[0].style = this.colors[color];
        this.color = color;
    }

    animate = (X, animationTime) => {
        this.#column.animate([
            { transform: `translate(${this.coordinates[0]}px, ${this.coordinates[1]}px)` },
            { transform: `translate(${X}px, ${this.coordinates[1]}px)` }
        ], animationTime/2)

        this.setCoordinates(X)
    }

    getCoordinates = () => this.#column.getAttribute('transform').match(/[0-9]+/g);

    setCoordinates = (X) => {
        this.#column.setAttribute("transform", `translate(${X}, ${this.coordinates[1]})`);
        this.coordinates = this.getCoordinates();
    }

    #createColumn = (canvas, { columnHeight, y, index, value }) => {
        const rect = this.#createSVGElement('rect', {
            width: 43,
            height: columnHeight,
            style: this.colors.blue,
        });

        const text = this.#createSVGElement('text', {
            text: value.toString(),
            y: columnHeight - 5,
        });

        const g = this.#createSVGElement('g', {
            transform: `translate(${8 + (53*index)}, ${y})`,
        });

        g.appendChild(rect);
        g.appendChild(text);
        canvas.appendChild(g);
        
        const { width } = text.getBBox();
        text.setAttribute('x', (43 / 2) - Math.round(width / 2));
        return g;
    };

    constructor(canvas, { columnHeight, y, index, value }) {
        this.color = 'blue';
        this.#column = this.#createColumn(canvas, { columnHeight, y, index, value })
        this.value = value;
        this.coordinates = this.getCoordinates();
    };
};