const svgns = "http://www.w3.org/2000/svg";
const canvas = document.getElementById('canvas');

export const createColumn = (columnHeight, y, index, value) => {
    const g = document.createElementNS(svgns, 'g');
    g.setAttribute("transform", `translate(${8 + (53*index)}, ${y})`);

    const rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('width', 43);
    rect.setAttribute('height', columnHeight);
    rect.style = 'fill: rgb(173, 216, 230);'

    const text = document.createElementNS(svgns, 'text');
    text.textContent = value.toString();
    text.setAttribute('y', columnHeight - 5);

    g.appendChild(rect);
    g.appendChild(text);
    canvas.appendChild(g);
    
    const { width } = text.getBBox();
    text.setAttribute('x', (43 / 2) - Math.round(width / 2));
}