import './reset.css';
import './fonts.css';
import './settings.css';
import './layout.css';
import './components.css';
import './style.css';

// Helper function to check if an element is in the viewport
function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom >= 0
    );
}

// Removed DOMContentLoaded event listener for sticky logo

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const heroContent = document.querySelector('.hero-content');
  const footerContent = document.querySelector('.footer-content');
  const orb = document.querySelector('.orb'); // Get orb element

  // Function to handle the parallax effect for the orb
  const updateParallax = () => {
    if (!orb) return; // Exit if orb not found

    const scrollY = window.scrollY;

    if (isInViewport(orb)) {
      const parallaxOffset = scrollY * -0.1; // Subtle parallax effect factor (negative for upward movement)
      // Apply transform, preserving the original centering from CSS
      orb.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;
    }
    // No explicit reset needed; effect is based on scrollY and viewport check
  };

  if (nav && heroContent && footerContent) {
    const handleScroll = () => {
      const heroContentRect = heroContent.getBoundingClientRect();
      const footerContentRect = footerContent.getBoundingClientRect();

      // Condition to show the nav: After the hero content bottom passes the viewport top
      const showNav = heroContentRect.bottom <= 0;
      
      // Condition to hide the nav: When the footer content top enters the viewport
      const hideNav = footerContentRect.top <= window.innerHeight;

      // Toggle class: Show if scrolled past hero content BUT before hitting footer content
      if (showNav && !hideNav) {
        nav.classList.add('nav-visible');
      } else {
        nav.classList.remove('nav-visible');
      }

      // Update parallax effect within the same optimized handler
      updateParallax(); 
    };

    // Attach scroll listener using requestAnimationFrame for smoothness
    window.addEventListener('scroll', () => {
      requestAnimationFrame(handleScroll);
    }, { passive: true }); // Use passive listener for performance

    // Initial checks on load for both nav and parallax
    handleScroll(); 
  } else {
    // Fallback if nav elements aren't found, but orb exists
    if (orb) {
      updateParallax(); // Set initial parallax state
      // Add a separate scroll listener just for parallax
      window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
      }, { passive: true });
    }
    // Log error if essential elements are missing
    if (!nav) console.error('Element .site-nav not found.');
    if (!heroContent) console.error('Element .hero-content not found.');
    if (!footerContent) console.error('Element .footer-content not found.');
    if (!orb) console.error('Element .orb not found.');
  }
});

