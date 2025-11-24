// Starfield animation for pixel-retro space effect (pause/resume capable)
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 180;
const STAR_SIZE = 2;
const STAR_SPEED = 0.15;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() > 0.8 ? STAR_SIZE : 1,
            speed: STAR_SPEED + Math.random() * 0.2
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
    }
}

function updateStars() {
    for (const star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.x = Math.random() * canvas.width;
            star.y = 0;
            star.size = Math.random() > 0.8 ? STAR_SIZE : 1;
            star.speed = STAR_SPEED + Math.random() * 0.2;
        }
    }
}

let animationFrameId = null;
function animate() {
    updateStars();
    drawStars();
    animationFrameId = requestAnimationFrame(animate);
}

function pauseStarfield() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function resumeStarfield() {
    if (!animationFrameId && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate();
    }
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
}
window.pauseStarfield = pauseStarfield;
window.resumeStarfield = resumeStarfield;
