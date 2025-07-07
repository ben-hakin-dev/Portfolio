import './reset.css';
import './fonts.css';
import './settings.css';
import './layout.css';
import './components.css';
import './style.css';

function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom >= 0
    );
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const heroContent = document.querySelector('.hero-content');
  const footerContent = document.querySelector('.site-footer');
  const fadeInElements = document.querySelectorAll('.fade-in');
  

  setTimeout(() => {
    fadeInElements.forEach(el => {
      el.classList.add('visible');
    });
  }, 0);

  if (nav && heroContent && footerContent) {
    const handleScroll = () => {
      const heroContentRect = heroContent.getBoundingClientRect();
      const footerContentRect = footerContent.getBoundingClientRect();

      const showNav = heroContentRect.bottom <= 0;
      
      const hideNav = footerContentRect.top <= window.innerHeight;

      if (showNav && !hideNav) {
        nav.classList.add('nav-visible');
      } else {
        nav.classList.remove('nav-visible');
      }

      updateParallax(); 
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(handleScroll);
    }, { passive: true });

    handleScroll(); 
  } else {
    if (orb) {
      updateParallax();
      window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
      }, { passive: true });
    }
    if (!nav) console.error('Element .site-nav not found.');
    if (!heroContent) console.error('Element .hero-content not found.');
    if (!footerContent) console.error('Element .site-footer not found.');
    if (!orb) console.error('Element .orb not found.');
  }
});

