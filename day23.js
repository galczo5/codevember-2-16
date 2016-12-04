class Circle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.r = options.r;
        this.steps = options.steps;
    }

    draw(step, text) {
        let stepValue = (2*Math.PI)/this.steps;
        let stepAngle = step * stepValue;
        let beginAngle = (Math.PI/2) - (Math.PI * 0.1);

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(stepAngle - beginAngle);
        this.drawArc();
        this.ctx.rotate(beginAngle - stepAngle);
        this.ctx.translate(-this.x, -this.y);
    }

    drawArc() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, Math.PI * 1.8);
        this.ctx.lineWidth = this.width;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#9e9e9e';
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

class Clock {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;

        this.milis = new Circle(ctx, {
            x: this.x,
            y: this.y,
            width: 25,
            r: 150,
            steps: 1000
        });

        this.seconds = new Circle(ctx, {
            x: this.x,
            y: this.y,
            width: 25,
            r: 200,
            steps: 60
        });

        this.minutes = new Circle(ctx, {
            x: this.x,
            y: this.y,
            width: 25,
            r: 250,
            steps: 60
        });

        this.hours = new Circle(ctx, {
            x: this.x,
            y: this.y,
            width: 25,
            r: 300,
            steps: 12
        });
    }

    draw() {
        let now = new Date();
        this.milis.draw(now.getMilliseconds());
        this.seconds.draw(now.getSeconds());
        this.minutes.draw(now.getMinutes(), now.getMinutes());
        this.hours.draw(now.getHours()%12, now.getHours());
        this.drawSeconds(now.getSeconds());
        this.drawHours(now.getHours(), now.getMinutes());
    }

    drawSeconds(seconds) {
        if (seconds < 10)
            seconds = '0' + seconds;

        this.ctx.translate(this.x, this.y + 10);

        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 72px sans-serif';
        this.ctx.fillStyle = '#9e9e9e';
        this.ctx.fillText(seconds, 0, 0);
        this.ctx.closePath();

        this.ctx.translate(-this.x, -this.y - 10);
    }

    drawHours(hours, minutes) {
        if (minutes < 10)
            minutes = '0' + minutes;

        this.ctx.translate(this.x, this.y + 40);

        this.ctx.beginPath();
        this.ctx.textAlign = 'center';
        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = '#9e9e9e';
        this.ctx.fillText(hours + ' : ' + minutes, 0, 0);
        this.ctx.closePath();

        this.ctx.translate(-this.x, -this.y - 40);

    }
}

window.onload = () => {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert("NO CONTEXT :<");

    let ctx = space.getContext('2d');

    let clock = new Clock(ctx, {
        x: space.width/2,
        y: space.height/2
    });

    setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);
        clock.draw();
    }, 10);
};
