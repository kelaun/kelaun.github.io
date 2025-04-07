/*==================== MENU SHOW/ HIDE ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalClose = document.querySelectorAll('.services__modal-close');

modalBtns.forEach((btn, i) => {
	btn.addEventListener('click', () => {
		modalViews[i].classList.add('active-modal');
	});
});

modalClose.forEach(closeBtn => {
	closeBtn.addEventListener('click', () => {
		modalViews.forEach(view => view.classList.remove('active-modal'));
	});
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');
function scrollActive(){
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
		sectionTop = current.offsetTop - 50,
		sectionId = current.getAttribute('id');
	document.querySelector(`.nav__menu a[href*=${sectionId}]`)
	    ?.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
    });
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    document.getElementById('scroll-up')?.classList.toggle('show-scroll', window.scrollY >= 560);
}
window.addEventListener('scroll', scrollUp);

/*==================== SHOW COPYRIGHT YEAR IN FOOTER ====================*/ 
document.getElementById('year').innerHTML = new Date().getFullYear();
