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

modalClose.forEach((closeBtn, index) => {
    closeBtn.addEventListener('click', () => {
        modalViews.forEach(view => view.classList.remove('active-modal'));
        if(modalBtns[index]) {
            modalBtns[index].focus();
        }
    });
    
    closeBtn.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeBtn.click();
        }
        if(e.key === 'Escape') {
            modalViews.forEach(view => view.classList.remove('active-modal'));
            if(modalBtns[index]) {
                modalBtns[index].focus();
            }
        }
    });
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        modalViews.forEach((modal, i) => {
            if(modal.classList.contains('active-modal')) {
                modal.classList.remove('active-modal');
                if(modalBtns[i]) {
                    modalBtns[i].focus();
                }
            }
        });
    }
});

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if(focusableElements.length === 0) return;
    
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
        
        const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
        if(navLink) {
            navLink.classList.toggle('active-link', 
                scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUpButton = document.getElementById('scroll-up');
    if(scrollUpButton) {
        scrollUpButton.classList.toggle('show-scroll', window.scrollY >= 560);
    }
}

window.addEventListener('scroll', scrollUp);

/*==================== FORM VALIDATION ====================*/
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const project = document.getElementById('project');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Simple validation example - can be enhanced as needed
        if(!name.value.trim()) {
            isValid = false;
            highlightField(name);
        }
        
        if(!email.value.trim() || !isValidEmail(email.value)) {
            isValid = false;
            highlightField(email);
        }
        
        if(!project.value.trim()) {
            isValid = false;
            highlightField(project);
        }
        
        if(!message.value.trim()) {
            isValid = false;
            highlightField(message);
        }
        
        if(!isValid) {
            e.preventDefault();
        }
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function highlightField(field) {
    field.style.borderBottom = '2px solid #ff6b6b';
    field.addEventListener('input', function() {
        field.style.borderBottom = '';
    }, {once: true});
}

/*==================== LAZY LOADING IMAGES ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // If the browser doesn't support native lazy loading, we don't need to do anything
    // as we already have loading="lazy" attributes in the HTML
    
    // But we can add additional lazy loading for browsers that don't support it
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }
    
    // For browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyLoad = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(lazyLoad, observerOptions);
    
    lazyImages.forEach(img => {
        observer.observe(img);
    });
});

/*==================== SHOW COPYRIGHT YEAR IN FOOTER ====================*/ 
const yearElement = document.getElementById('year');
if(yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
}
