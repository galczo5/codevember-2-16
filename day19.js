let space = null;
let ctx = null;
let rectangles = [];

class Rectangle {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = 0;
        this.range = 300;
    }

    drawRect(ctx) {
        let translateX = this.x + this.w/2;
        let translateY = this.y + this.h/2;

        ctx.translate(translateX, translateY);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.rect(-(this.w/2), -(this.h/2), this.w, this.h);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();

        ctx.rotate(-(this.angle));
        ctx.translate(-translateX, -translateY);
    }

    getDistance(r) {
        let a = Math.abs(r.x - this.x);
        let b = Math.abs(r.y - this.y);
        return Math.sqrt((a*a) + (b*b));
    }

    isConnected(r) {
        return this.getDistance(r) < this.range;
    }

    connect(ctx, r) {
        ctx.beginPath();

        let color = 255 * (1 - (this.getDistance(r) / this.range));
        color = Math.floor(color);

        ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
        ctx.lineTo(r.x + r.w/2, r.y + r.h/2);
        ctx.strokeStyle = 'rgb(' + color +  ', ' + color + ', ' + color + ')';
        ctx.stroke();

        ctx.closePath();
    }
}

function onLoad() {
    space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert("Context not found");

    ctx = space.getContext('2d');
    space.addEventListener('click', canvasOnClick);
    setInterval(drawScene, 100);
}

function canvasOnClick(e) {
    let r = new Rectangle(e.pageX - 5, e.pageY - 5, 10, 10);
    rectangles.push(r);
}

function drawScene() {
    ctx.clearRect(0, 0, space.width, space.height);
    rectangles.forEach((r) => {
        drawConnections(r);

        r.angle += 10 * (Math.PI / 180);
        r.drawRect(ctx);
    });

}

function drawConnections(rect) {
    rectangles.filter(r => r.x != rect.x && r.y != rect.y)
        .filter(r => rect.isConnected(r))
        .forEach((r) => {
            rect.connect(ctx, r);
        });
}
