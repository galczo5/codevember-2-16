class Sky {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.w = options.w;
        this.h = options.h;

        this.stars = [];
    }

    generate(number) {
        for(let i = 0; i < number; i++) {
            this.stars.push({
                x: Math.floor(Math.random() * this.w),
                y: Math.floor(Math.random() * this.h),
                r: Math.floor(Math.random() * 5) + 2
            });
        }
    }

    draw() {
        this.fillStyle = 'white';
        this.stars.forEach(s => {
            this.ctx.save();
            this.ctx.translate(s.x, s.y);
            this.ctx.arc(0, 0, s.r, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
}

class Ship {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.speed = 0;
        this.angle = Math.PI;

        this.x = options.x;
        this.y = options.y;
    }

    accelerate(val) {
        this.speed += val;
    }

    rotate(val) {
        this.angle += val;
    }

    draw() {

        if(this.speed > 0.5) {
            this.speed -= (this.speed * 0.01);
            this.img = document.getElementById('spaceship-move-image');
        }
        else this.img = document.getElementById('spaceship-image');

        let oldX = this.x;
        let oldY = this.y;

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        if(this.x <= 0 || this.y <= 0 || this.x >= window.innerWidth || this.y >= window.innerHeight) {
            this.x = oldX;
            this.y = oldY;
        }

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.img, -50, -15);

        this.ctx.restore();
    }
}

window.onload = () => {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert('NO CONTEXT');

    let ctx = space.getContext('2d');

    let sky = new Sky(ctx, {
        w: space.width,
        h: space.height
    });

    sky.generate(10);

    let spaceShip = new Ship(ctx, {
        x: space.width/2,
        y: space.height/2
    });

    window.setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);
        spaceShip.draw();
    }, 10);

    window.onkeydown = (e) => {
        if(e.code == 'ArrowUp')
            spaceShip.accelerate(3);
        else if(e.code == 'ArrowDown')
            spaceShip.accelerate(-0.1);
        else if(e.code == 'ArrowLeft')
            spaceShip.rotate(-Math.PI/36);
        else if(e.code == 'ArrowRight')
            spaceShip.rotate(Math.PI/36);
    };
};
