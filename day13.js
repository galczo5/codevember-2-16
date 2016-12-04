'use strict';

let arc = 0;
let translate = 0;

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

class Pac {

    constructor(dom) {
        this.x = 10;
        this.y = 10;
        this.arc = 0;
        this.dom = dom;
    }

    getTransform(step, arc) {
        this.arc = arc;

        let newY = this.y + (step * Math.sin(toRadians(this.arc)));
        let newX = this.x + (step * Math.cos(toRadians(this.arc)));

        if(newX < window.innerWidth && newX > 0 && newY < window.innerHeight && newY > 0) {
            this.y = newY;
            this.x = newX;
        }

        this.dom.style.transform = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px) rotate(' + this.arc + 'deg)';
    }

    leaveTrack () {
        let body = document.body;
        let track = document.createElement('div');
        track.classList.add('track');
        track.style.left = this.x + 'px';
        track.style.top = (this.y + 25) + 'px';
        body.appendChild(track);
    }
}

let pac = new Pac(document.getElementById('pac'));

document.onkeydown = function (e) {

    let step = 0;
    e = e || window.event;

    if (e.keyCode == '37') arc -= 10;
    else if (e.keyCode == '39') arc += 10;

    pac.getTransform(0, arc);
};

function move() {
    setTimeout(function () {
        pac.getTransform(1, arc);
        move();
    }, 10);
}

function leaveTrack() {
    setTimeout(function () {
        pac.leaveTrack();
        leaveTrack();
    }, 700);
}

function init () {
    move();
    leaveTrack();
}
