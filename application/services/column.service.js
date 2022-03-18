export class ColumnService {
    #column;
    value;
    regex = /[0-9]+/g;
    coordinates;
    #svgns = "http://www.w3.org/2000/svg";
    color;

    #createSVGElement = (svgTag) => document.createElementNS(this.#svgns, svgTag);

    fillWithGreen = () => {
        this.#column.childNodes[0].style = 'fill: rgb(0, 216, 0);';
        this.color = 'green';
    };

    fillWithBlue = () => {
        this.#column.childNodes[0].style = 'fill: rgb(173, 216, 230);';
        this.color = 'blue';
    };

    fillWithRed = () => {
        this.#column.childNodes[0].style = 'fill: rgb(188, 65, 43);';
        this.color = 'red';
    };

    fillWithPeach = () => {
        this.#column.childNodes[0].style = 'fill: rgb(215, 180, 158);';
        this.color = 'peach';
    };

    fillWithOrange = () => {
        this.#column.childNodes[0].style = 'fill: rgb(220, 96, 46);';
        this.color = 'orange';
    };

    fillWithTeal = () => {
        this.#column.childNodes[0].style = 'fill: rgb(5, 168, 170);';
        this.color = 'teal';
    };

    animate = (X, animationTime) => {
        this.#column.animate([
            { transform: `translate(${this.coordinates[0]}px, ${this.coordinates[1]}px)` },
            { transform: `translate(${X}px, ${this.coordinates[1]}px)` }
        ], animationTime/2)

        this.setCoordinates(X)
    }

    getCoordinates = () => this.#column.getAttribute('transform').match(this.regex);

    setCoordinates = (X) => {
        this.#column.setAttribute("transform", `translate(${X}, ${this.coordinates[1]})`);
        this.coordinates = this.getCoordinates();
    }

    #createColumn = (canvas, { columnHeight, y, index, value }) => {
        const rect = this.#createSVGElement('rect');
        rect.setAttribute('width', 43);
        rect.setAttribute('height', columnHeight);
        rect.style = 'fill: rgb(173, 216, 230);'

        const text = this.#createSVGElement('text');
        text.textContent = value.toString();
        text.setAttribute('y', columnHeight - 5);

        const g = this.#createSVGElement('g');
        g.setAttribute("transform", `translate(${8 + (53*index)}, ${y})`);
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