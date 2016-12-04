class Drop {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.angle = (Math.random() * Math.PI/8) - Math.PI/16;
        this.lenght = Math.floor(Math.random() * 40) + 10;
        this.speed = 5;
        this.x = x;
        this.y = -20;

        this.angle = -Math.PI/2 + this.angle;
    }

    draw() {
        if(this.y >= window.innerHeight)
            return;

        this.x += this.speed * Math.cos(this.angle + Math.PI);
        this.y += this.speed * Math.sin(this.angle + Math.PI);

        let endX = this.lenght * Math.cos(this.angle + Math.PI);
        let endY = this.lenght * Math.sin(this.angle + Math.PI);
        endX += this.x;
        endY += this.y;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#b71c1c';
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

window.onload = () => {
    let space = document.getElementById('space');
    space.width = window.innerWidth;
    space.height = window.innerHeight;

    if(!space.getContext)
        alert('NO CONTEXT');

    let ctx = space.getContext('2d');
    let drops = [];

    setInterval(() => {
        drops = drops.filter(d => d.y <= space.height);
        let size = Math.floor(Math.random() * 10);
        for(let i = 0; i < size; i++)
            drops.push(new Drop(ctx, Math.floor(Math.random() * space.width)));
    }, 50);

    setInterval(() => {
        //ctx.clearRect(0, 0, space.width, space.height);
        drops.forEach(d => d.draw());
    }, 30);
};
