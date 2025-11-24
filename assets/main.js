// Smooth scroll and navbar highlight for retro portfolio

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight nav link on scroll
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar a');
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // initial set
});
