let box1 = document.getElementById('box-1');
let box2 = document.getElementById('box-2');
let box3 = document.getElementById('box-3');
let box4 = document.getElementById('box-4');

function play() {

    setTimeout(() => {
        box2.style['animation-name'] = 'box-2-in';
    }, 1000);

    setTimeout(() => {
        box1.style['animation-name'] = 'box-1-out';
    }, 2000);

    setTimeout(() => {
        box3.style['animation-name'] = 'box-3-in';
    }, 3000);

    setTimeout(() => {
        box2.style['animation-name'] = 'box-2-out';
    }, 4000);

    setTimeout(() => {
        box4.style['animation-name'] = 'box-4-in';
    }, 5000);

    setTimeout(() => {
        box3.style['animation-name'] = 'box-3-out';
    }, 6000);

    setTimeout(() => {
        box1.style['animation-name'] = 'box-1-in';
    }, 7000);

    setTimeout(() => {
        box4.style['animation-name'] = 'box-4-out';
    }, 8000);

    setTimeout(() => {
        play();
    }, 8000);

}
