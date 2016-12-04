class Ring {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.initialR = this.r;
        this.angle = 0;
        this.elements = [];
    }

    generate(count) {
        this.elements = [];
        for(let i =0; i < count; i++) {
            this.angle += (Math.random() * (Math.PI/4));
            this.elements.push({
                r: (Math.floor(Math.random() * 50) - 25 + this.r),
                a: this.angle
            });

            this.r++;
        }

        if(this.r > window.innerWidth/2 + 100)
            this.r = this.initialR;
    }

    draw() {
        this.elements.forEach(e => {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(e.a);
            this.ctx.beginPath();
            this.ctx.rect(0, e.r, 10, 10);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        });
    }
}

window.onload = () => {

    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
            alert('NO CONTEXT');

    let ctx = space.getContext('2d');

    let ring = new Ring(ctx, {
        x: space.width/2,
        y: space.height/2,
        r: 100
    });

    ring.draw();

    setInterval(() => {
        ring.generate(250);
        ring.draw();
    }, 10);
};
