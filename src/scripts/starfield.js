// starfield.js 
(function() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) {
    console.warn('Star canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Unable to get 2D context from canvas');
    return;
  }

  let stars = [];
  const STAR_COUNT = 180;
  const STAR_SIZE = 2;
  const STAR_SPEED = 0.15;

  function resizeCanvas() {
    try {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } catch (error) {
      console.error('Error resizing canvas:', error);
    }
  }

  function createStars() {
    try {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height, 
          size: Math.random() > 0.8 ? STAR_SIZE : 1, 
          speed: STAR_SPEED + Math.random() * 0.2 
        });
      }
    } catch (error) {
      console.error('Error creating stars:', error);
    }
  }

  function drawStars() {
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
      }
    } catch (error) {
      console.error('Error drawing stars:', error);
    }
  }

  function updateStars() {
    try {
      for (const star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.x = Math.random() * canvas.width;
          star.y = 0;
          star.size = Math.random() > 0.8 ? STAR_SIZE : 1;
          star.speed = STAR_SPEED + Math.random() * 0.2;
        }
      }
    } catch (error) {
      console.error('Error updating stars:', error);
    }
  }

  let animationFrameId = null;
  function animate() {
    try {
      updateStars();
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error in animation loop:', error);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
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

  // Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      createStars();
    }, 250);
  });

  // Initialize
  try {
    resizeCanvas();
    createStars();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }
    window.pauseStarfield = pauseStarfield;
    window.resumeStarfield = resumeStarfield;
  } catch (error) {
    console.error('Error initializing starfield:', error);
  }
})();
