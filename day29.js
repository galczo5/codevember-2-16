class Particle {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;

        this.w = 2;
        this.h = 2;
    }

    distance(x, y) {
        let argX = Math.abs(this.x - x);
        let argY = Math.abs(this.y - y);

        return Math.sqrt(argX*argX + argY*argY);
    }

    cursorInfluence(x, y) {
        return this.distance(x, y) < 200;
    }

    draw(x, y) {
        let angle = 0;
        let speed = 0;
        let distance = this.distance(x, y);

        if(this.cursorInfluence(x, y)) {
            angle = Math.atan2(y - this.y, x - this.x);
            speed = distance * distance * 0.0001;
            this.x += speed * Math.cos(angle);
            this.y += speed * Math.sin(angle);
        }

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.w, this.h);
        this.ctx.fillStyle = '#0d47a1';
        this.ctx.fill();
        this.ctx.closePath();
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
    let particles = [];
    let size = 1;

    let cursorX;
    let cursorY;

    window.onmousemove = (e) => {
        cursorY = e.clientY;
        cursorX = e.clientX;
    };

    setInterval(() => {
        particles.push(new Particle(ctx, {
            x: Math.floor(Math.random() * space.width),
            y: Math.floor(Math.random() * space.height)
        }));

        ctx.clearRect(0, 0, space.width, space.height);
        particles.forEach(p => p.draw(cursorX, cursorY));
    }, 20);
};
