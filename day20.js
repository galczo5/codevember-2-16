let usedSpeed = 5;

class Sun {

    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.angle = 0;
        this.ring = options.r;
        this.ringDirection = 4;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.closePath();
    }

    getDistance(x, y) {
        let a = Math.abs((this.x + this.r) - x);
        let b = Math.abs((this.y + this.r) - y);
        return Math.sqrt((a*a) + (b*b));
    }
}

class Element {

    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
        this.w = options.w;
        this.h = options.h;
        this.speed = options.speed;
        this.angle = 0;
    }

    calculateGravity(sun, space) {
        let gravity = 1 - (sun.getDistance(this.x, this.y) / space.width);
        gravity *= gravity;
        gravity *= 10;
        return gravity;
    }

    setElementPosition(sun, space) {
        let gravity = Math.floor(this.calculateGravity(sun, space));
        if(this.y < (sun.y + sun.r / 2)) this.y -= gravity;
        else this.y += gravity;

        this.x += this.speed;
        this.angle += 10 * (Math.PI / 180);
    }

    setElementPositionText() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "gray";
        this.ctx.fillText('x: ' + this.x + ', y: ' + this.y + ', speed: ' + this.speed, -25, -25);
        this.ctx.closePath();
    }

    move(sun, space) {
        let translateX = this.x + this.w/2;
        let translateY = this.y + this.h/2;

        this.setElementPosition(sun, space);
        this.ctx.translate(translateX, translateY);
        this.ctx.rotate(this.angle);

        this.ctx.beginPath();
        this.ctx.rect(-(this.w/2), -(this.h/2), this.w, this.h);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.rotate(-this.angle);
        this.setElementPositionText();
        this.ctx.translate(-translateX, -translateY);
    }
}

function onLoad() {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert("Context not found");

    let ctx = space.getContext('2d');

    let sun = new Sun(ctx, {
        x: space.width - Math.floor(space.width / 3),
        y: Math.floor(space.height / 2),
        r: Math.floor(space.height / 6)
    });

    drawScene(ctx, space, sun);
}

function drawScene(ctx, space, sun) {
    let elements = [];
    setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);
        sun.draw();

        let random = Math.floor(Math.random() * 5);
        if(random%5 == 0)
            elements.push(generateElement(ctx, space));

        elements.forEach(el => el.move(sun, space));
        destroyElements(elements, space);
    }, 50);
}

function generateElement(ctx, space) {
    let dim = Math.floor(Math.random() * 10);
    let el = new Element(ctx, {
        x: 20,
        y: Math.floor(Math.random() * space.height),
        w: dim,
        h: dim,
        speed: usedSpeed + Math.floor(Math.random() * 10)
    });

    return el;
}

function destroyElements(elements, space) {
    elements.filter(el => el.x > space.width)
        .forEach(el => elements.splice(elements.indexOf(el), 1));
}

window.onkeydown = function(e) {
    if(e.code == 'ArrowRight') usedSpeed += 5;
    else if(usedSpeed - 5 > 0 && e.code == 'ArrowLeft') usedSpeed -= 5;
};
