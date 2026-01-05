
document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');

    const links = document.getElementById('links');

    if (!menuToggle || !links) return;

    menuToggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

});