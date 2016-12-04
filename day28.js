class Loader {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;

        this.angle = options.angle;
        this.speed = options.speed;
        this.arc = 0;
        this.lineWidth = this.r/4;
        this.random = Math.random() + 0.2;
    }

    destruct() {
        return this.arc >= Math.PI * 2;
    }

    raiseChildren() {
        return this.r > 10;
    }

    constructChildren() {
        let result = [];
        let angle = Math.random() * Math.PI/2;

        for(let i = 0; i < 4; i++ ) {
            result.push(new Loader(this.ctx, {
                x: this.x,
                y: this.y,
                r: this.r/2,
                angle: angle + (Math.PI/2) * i,
                speed: this.speed + 2
            }));
        }

        return result;
    }

    draw() {
        this.arc += this.random * Math.PI/36;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        this.ctx.save();
        this.ctx.translate(this.x, this.y);

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, Math.PI*2);
        this.ctx.fillStyle = '#212121';
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, this.arc);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = '#b71c1c';
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();
    }
}

window.onload = () => {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if (!space.getContext)
        alert('NO CONTEXT');

    let ctx = space.getContext('2d');

    let loaders = [];

    window.onclick = (e) => {
        loaders.push(new Loader(ctx, {
            x: e.clientX,
            y: e.clientY,
            r: 50,
            angle: 0,
            speed: 0
        }));
    };

    setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);

        let parents = loaders.filter(l => l.destruct() && l.raiseChildren());
        parents.forEach(p => {
            loaders = loaders.concat(p.constructChildren());
        });

        loaders = loaders.filter(l => !l.destruct());
        loaders.forEach((loader) => {
            loader.draw();
        });

    }, 25);

};
