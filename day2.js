document.getElementById('next-btn').addEventListener('click', function () {

    var nav = document.getElementById('card-nav');
    var content = document.getElementById('card-content');

    nav.classList.remove('inactive');
    content.classList.remove('inactive');

    nav.classList.add('active');
    content.classList.add('active');

});

document.getElementById('prev-btn').addEventListener('click', function () {

    var nav = document.getElementById('card-nav');
    var content = document.getElementById('card-content');

    nav.classList.remove('active');
    content.classList.remove('active');

    nav.classList.add('inactive');
    content.classList.add('inactive');

});
