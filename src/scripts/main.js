// main.js (navigation + active link)
document.addEventListener('DOMContentLoaded', function () {
  try {
    // Smooth scroll for nav links with error handling
    const navbarLinks = document.querySelectorAll('.navbar a');
    if (navbarLinks.length > 0) {
      navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          try {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
              }
            }
          } catch (error) {
            console.error('Error handling navigation click:', error);
          }
        });
      });
    }

    // Highlight nav link on scroll with error handling
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    if (sections.length > 0 && navLinks.length > 0) {
      function updateActiveNav() {
        try {
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) { 
              const id = section.getAttribute('id');
              if (id) current = id;
            }
          });
          navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            const href = link.getAttribute('href');
            if (href && current && href === '#' + current) {
              link.classList.add('active');
              link.setAttribute('aria-current', 'page');
            }
          });
        } catch (error) {
          console.error('Error updating active navigation:', error);
        }
      }
      window.addEventListener('scroll', updateActiveNav);
      updateActiveNav();
    }
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
});
