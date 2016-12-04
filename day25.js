class Tree {
    constructor(ctx, options) {
        this.ctx = ctx;
        this.x = options.x;
        this.y = options.y;
    }

    draw(step) {
        this.ctx.lineWidth = 15;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.moveTo(-50, 0);

        for(let i = 0; i < step; i++) {
            this.ctx.lineTo(-(i + 1) * 50, i * 25);
            this.ctx.lineTo(0, -(i + 1) * 45);
            this.ctx.lineTo((i + 1) * 50, (i + 1) * 25);
        }

        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

window.onload = () => {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    let ctx = space.getContext('2d');
    let tree = new Tree(ctx, {
        x: space.width/2,
        y: space.height/2
    });

    let direction = -1;
    let step = 0;

    setInterval(() => {

        if(step%40 == 0)
            direction = 0 - direction;

        step += direction;
        ctx.clearRect(0, 0, space.width, space.height);
        tree.draw(step);
    }, 50);
};
