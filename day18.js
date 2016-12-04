let space = document.getElementById('space');

class Path {
    constructor (initialPoint, ctx) {
        this.initialPoint = initialPoint;
        this.ctx = ctx;
        this.steps = Math.floor(Math.random() * 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.initialPoint.x, this.initialPoint.y);
        this.ctx.beginPath();

        let to = this.drawLine(this.initialPoint);

        for (let i = 0; i < this.steps; i++)
            to = this.drawLine(to);
    }

    drawLine(from) {

        let to = {
            x: Math.floor(Math.random() * 20) - 10 + from.x,
            y: Math.floor(Math.random() * 20) - 10 + from.y
        };

        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();

        return to;
    }
}

function onLoad() {

    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert("Cannot get context");

    let initialPoint = {
        x: space.width / 2,
        y: space.height / 2
    };

    let ctx = space.getContext('2d');
    ctx.strokeStyle = "#ffffff";
    scene(ctx, initialPoint);
}

function scene(ctx, initialPoint) {
    setTimeout(function () {
        clear(ctx);

        let path = new Path(initialPoint, ctx);
        path.draw();
        scene(ctx, initialPoint);

    }, 500);
}

function clear(ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
