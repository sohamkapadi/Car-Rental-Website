let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

menu.onscroll = () =>{
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const sr=ScrollReveal({
    distance: '60px',
    duration: 2500,
    display: 400,
    reset: true
})

sr.reveal('.text',{display:200,origin: 'top'})
sr.reveal('.form-container',{display:800,origin: 'left'})
sr.reveal('.heading',{display:800,origin: 'top'})
sr.reveal('.ride-container .box',{display:600,origin: 'top'})
sr.reveal('.service-container .box',{display:600,origin: 'top'})
sr.reveal('.about-container .box',{display:600,origin: 'top'})
sr.reveal('.reviews-container .box',{display:600,origin: 'top'})
sr.reveal('.newsletter .box',{display:400,origin: 'bottom'})