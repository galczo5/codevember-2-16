class Dot {
    constructor (dom, e) {
        this.dom = dom;

        this.dom.classList.add('dot');

        let dim = Math.floor(Math.random() * 300);
        this.dom.style.width = dim + 'px';
        this.dom.style.height = dim + 'px';

        this.dom.style.left = (e.clientX - (dim / 2)) + 'px';
        this.dom.style.top = (e.clientY - (dim / 2)) + 'px';

        let animations = ['disapear-1', 'disapear-2', 'disapear-3'];
        this.dom.style['animation-name'] = animations[Math.floor(Math.random() * animations.length)];

        let body = document.body;
        body.appendChild(this.dom);
        this.blink();
    }

    blink () {
        let dom = this.dom;
        setTimeout(function () {

            let dim = dom.clientWidth;
            dom.style.width = dim + 'px';
            dom.style.height = dim + 'px';

            dom.style['animation-name'] = 'blink';
            dom.style['animation-duration'] = '1s';
            dom.style['animation-iteration-count'] = 'infinite';
        }, 5000);
    }
}

document.body.addEventListener('click', function (e) {
    console.log(e);
    new Dot(document.createElement('div'), e);
});
