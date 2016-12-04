let body = document.body;
let counterElem = document.getElementById('counter');
let counter = 0;
body.style['font-size'] = (window.innerHeight * 2) + 'px';

window.onkeydown = (e) => {
    counter++;
    counterElem.innerHTML = counter;
};
