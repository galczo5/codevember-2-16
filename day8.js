let space = document.getElementById('space');
let arcX = -65;
let arcY = -65;

document.onkeydown = function (e) {

    e = e || window.event;

    if (e.keyCode == '38') arcX++;
    else if (e.keyCode == '40') arcX--;
    else if (e.keyCode == '37') arcY--;
    else if (e.keyCode == '39') arcY++;

    space.style.transform = 'rotateX(' + arcX + 'deg) rotateY(' + arcY + 'deg)';
};

space.style.transform = 'rotateX(' + arcX + 'deg) rotateY(' + arcY + 'deg)';
