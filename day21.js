class Cannon {
    constructor(ctx, options) {
        this.ctx = ctx;

        this.angle = 0;
        this.power = 10;
        this.x = options.x;
        this.y = options.y;
        this.lenght = options.lenght;
    }

    drawPlatform() {
        let translateX = this.x - this.lenght/2;
        let translateY = this.y;

        this.ctx.translate(translateX, translateY);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.lenght, 0);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.translate(-translateX, -translateY);
    }

    drawBarrel() {
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.beginPath();
        this.ctx.moveTo(-20, 0);
        this.ctx.lineTo(-8, -100);
        this.ctx.lineTo(8, -100);
        this.ctx.lineTo(20, 0);
        this.ctx.lineTo(0, 20);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.rotate(-this.angle);
        this.ctx.translate(-this.x, -this.y);
    }

    drawText() {
        this.ctx.translate(this.x, this.y + 50);

        this.ctx.fillStyle = 'black';
        this.ctx.fillText(Math.floor(this.angle * 180 / Math.PI), -4, 0);

        this.ctx.translate(-this.x, -this.y - 50);
    }

    draw() {
        this.drawPlatform();
        this.drawBarrel();
        this.drawText();
    }

    fire() {
        return new Bullet(this.ctx, {
            speed: 10,
            angle: this.angle,
            x: this.x,
            floor: this.y
        });
    }
}

class Bullet {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.r = 8;
        this.speed = options.speed;
        this.x = options.x;
        this.y = -100;
        this.angle = options.angle;
        this.floor = options.floor;
    }

    move() {
        this.r -= (this.r/100);
        this.speed -= (this.speed/100);
        this.y -= this.speed;

        this.ctx.translate(this.x, this.floor);
        this.ctx.rotate(this.angle);
        this.ctx.beginPath();
        this.ctx.arc(0, this.y, this.r, 0, 2*Math.PI);
        this.ctx.fillStyle = 'orange';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.rotate(-this.angle);
        this.ctx.translate(-this.x, -this.floor);
    }
}

window.onload = function() {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert("NO CONTEXT...");

    let ctx = space.getContext('2d');

    let cannon = new Cannon(ctx, {
        x: window.innerWidth/2,
        y: Math.floor(window.innerHeight - window.innerHeight/4),
        lenght: Math.floor(window.innerWidth/3)
    });

    let bullets = [];

    setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);
        bullets.forEach(b => b.move());
        cannon.draw();

        bullets = bullets.filter(b => b.r > 1);
    }, 10);

    window.onkeydown = (e) => {
        if(e.code == 'ArrowLeft')
            cannon.angle -= Math.PI/36;
        else if(e.code == 'ArrowRight')
            cannon.angle += Math.PI/36;
        else if(e.code == 'ArrowUp')
            bullets.push(cannon.fire());
    };
};
