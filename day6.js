var colors = [
    '#78C5D6',
    '#459BA8',
    '#79C267',
    '#C5D647',
    '#F5D63D',
    '#F28C33'
];

let rainbowText = [];

let sunday = document.getElementById('sunday-text');
let sundayText = sunday.innerHTML.trim();

function cleanUp() {
    rainbowText = [];
    sunday.innerHTML = '';

    for(let i in sundayText) {
        let newSpan = document.createElement('span');
        newSpan.innerHTML = sundayText[i];
        sunday.appendChild(newSpan);
        rainbowText.push(newSpan);
    }
}

let setColor = (j) => {
    let k = 0;
    for(let i = j; i >= 0; i--) {
        rainbowText[i].style.color = colors[colors.length - 1 - k];
        k++;
    }
};

function init() {
    cleanUp();
    fillRainbow();

    setTimeout(function() {
        init();
    }, 2000);
};

function fillRainbow() {
    for(let i = 0; i < colors.length; i++) {
        for(let j = i; j >= 0; j--) {
            setTimeout(() => {
                setColor(j);
            }, j * 250);
        }
    }
};
