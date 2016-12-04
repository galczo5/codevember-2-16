let body = document.body;

window.onscroll = function(e) {
    let alpha = body.scrollTop / (body.scrollHeight - body.clientHeight);
    body.style.background = 'rgba(0, 0, 0, ' + alpha +')';
};
