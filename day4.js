let valueTable = [0, 50, 100, 150, 200, 255];
let selectedColor = 'rgb(200, 200, 200)';
let blockHeight = 25;

let initialState = {
    '3': [8, 9, 10, 14, 17, 19, 23, 24],
    '4': [8, 11, 13, 15, 17, 19, 22, 25],
    '5': [8, 11, 13, 15, 17, 19, 25],
    '6': [8, 11, 13, 14, 15, 17, 18, 19, 23, 24],
    '7': [8, 11, 13, 15, 18, 25],
    '8': [8, 11, 13, 15, 18, 22, 25],
    '9': [8, 9, 10, 13, 15, 18, 23, 24]
};

let generateColors = () => {
    let result = [];
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 6; j++)
            for (let k = 0; k < 6; k++) {
                result.push({
                    R: valueTable[i],
                    G: valueTable[j],
                    B: valueTable[k]
                });
            }

    return result;
};

let setBackground = (el, color) => {
    el.style.background = 'rgb(' + color.R + ',' + color.G + ',' + color.B + ')';
};

let getBodyDimension = (elSize) => {
    let body = document.body;
    return {
        width: (body.offsetWidth / elSize),
        height: (body.offsetHeight / elSize)
    };
};

let generateGrid = () => {
    let body = document.body;
    let dim = getBodyDimension(blockHeight);

    for(let i = 0; i < dim.height - 1; i++) {
        let wrapper = document.createElement('div');

        for(let j = 0; j < dim.width - 1; j++) {
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-block');
            gridCell.style.height = blockHeight + 'px';
            gridCell.style.width = blockHeight + 'px';
            gridCell.addEventListener('click', function () {
                this.style.background = selectedColor;
                this.style['border-color'] = selectedColor;
            });

            if (typeof initialState[i] != 'undefined' && initialState[i].indexOf(j) != -1) {
                gridCell.style.background = selectedColor;
                gridCell.style['border-color'] = selectedColor;
            }

            wrapper.appendChild(gridCell);
        }

        body.appendChild(wrapper);
    }

};

function init() {
    let toolbar = document.getElementById('color-toolbar');
    generateGrid();

    generateColors().forEach(function (color) {
        let colorDiv = document.createElement('div');
        setBackground(colorDiv, color);
        colorDiv.classList.add('color-block');
        colorDiv.addEventListener('click', function () {
            selectedColor = this.style.background;
        });
        toolbar.appendChild(colorDiv);
    });
}
