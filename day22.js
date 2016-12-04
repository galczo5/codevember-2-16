class Ring {
    constructor(ctx, space, r) {
        this.r = r;
        this.x = space.width/2;
        this.y = space.height/2;
        this.angle = Math.random() * (2 * Math.PI);
        this.directionReverse = Math.random() > 0.5;
        this.ctx = ctx;

        this.speed = Math.PI / 36;
        this.hole = Math.random();
    }

    move() {

        if(this.directionReverse) this.angle += this.speed;
        else this.angle -= this.speed;

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, Math.PI * (2 - this.hole));
        this.ctx.strokeStyle = '#b71c1c';
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.rotate(-this.angle);
        this.ctx.translate(-this.x, -this.y);
    }

}

window.onload = function () {

    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    let ctx = space.getContext('2d');
    let rings = [];

    for(let i = 10; i < space.width; i = i + 10)
        rings.push(new Ring(ctx, space, i));

    setInterval(() => {
        ctx.clearRect(0, 0, space.width, space.height);
        rings.forEach(r => r.move());
    }, 50);
};
