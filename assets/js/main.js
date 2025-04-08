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
		const closeBtn = modalViews[i].querySelector('.services__modal-close');
		if(closeBtn) {
			setTimeout(() => closeBtn.focus(), 100);
		}
		trapFocus(modalViews[i]);
	});
	btn.addEventListener('keydown', (e) => {
		if(e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			btn.click();
		}
	});
});

modalClose.forEach(closeBtn => {
	closeBtn.addEventListener('click', () => {
		modalViews.forEach(view => view.classList.remove('active-modal'));
		const buttonIndex = Array.form(modalClose).indexOf(closeBtn);
		if(buttonIndex >= 0 && modalBtns[buttonIndex]) {
			modalBtns[buttonIndex].focus();
		}
	});
	closeBtn.addEventListener('keydown', (e) => {
		if(e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			closeBtn.click();
		}
		if(e.key === 'Escape') {
			modalViews.forEach(view => view.classList.remove('active-modal'));
			const buttonIndex = Array.from(modalClose).indexOf(closeBtn);
			if(buttonIndex >= 0 && modalBtns[buttonIndex]) {
				modalBtns[buttonIndex].focus();
			}
		}
	});
});

document.addEventListener('keydown', (e) => {
	if(e.key === 'Escape') {
		modalViews.forEach((modal, i) => {
			if(modal.classList.contains('active-modal')) {
				modal.classList.remove('active-modal');
				modalBtns[i]?.focus();
			}
		});
	}
});

function trapFocus(modal) {
	const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	modal.addEventListener('keydown', function(e) {
		if(e.key === 'Tab') {
			if(e.shiftKey) {
				if(document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if(document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
	});
}

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
