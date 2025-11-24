// Background
(function() {
  try {
    function getBgVideos() {
      try {
        const exts = ['.mp4', '.webm', '.ogg'];
        const files = ['1.mp4','2.mp4','3.mp4','4.mp4','5.mp4','6.mp4'];
        return files.filter(f => exts.some(ext => f.endsWith(ext))).map(f => 'src/assets/bg/' + f);
      } catch (error) {
        console.error('Error getting background videos:', error);
        return [];
      }
    }

    const bgVideos = [null, ...getBgVideos()];
    let bgIndex = 0;
    const bgContainer = document.getElementById('bg-video-container');
    const bgOverlay = document.getElementById('bg-overlay');
    const starCanvas = document.getElementById('star-canvas');

    if (!bgContainer) {
      console.warn('Background video container not found');
      return;
    }

    function createBgElement(src) {
      if (!src) return null;
      try {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // Add error handling for video loading
        video.addEventListener('error', function(e) {
          console.error('Error loading video:', src, e);
          if (video.parentNode) {
            video.parentNode.removeChild(video);
          }
        });

        video.addEventListener('loadeddata', function() {
          console.log('Video loaded successfully:', src);
        });

        Object.assign(video.style, {
          position:'fixed',
          top:'0',
          left:'0',
          width:'100vw',
          height:'100vh',
          objectFit:'cover',
          zIndex:'var(--z-bg-video)',
          pointerEvents:'none',
          opacity:'0',
          transition:'opacity 1.2s cubic-bezier(.4,0,.2,1)'
        });
        return video;
      } catch (error) {
        console.error('Error creating video element:', error);
        return null;
      }
    }

    function crossfadeBg(nextIndex) {
      try {
        const prevVideo = bgContainer.querySelector('video');
        let nextBg = null;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (bgVideos[nextIndex]) {
          nextBg = createBgElement(bgVideos[nextIndex]);
          if (nextBg) {
            bgContainer.appendChild(nextBg);
            if (!reduceMotion) {
              setTimeout(() => { nextBg.style.opacity = '1'; }, 50);
            } else {
              nextBg.style.opacity = '1';
              nextBg.style.transition = 'none';
            }
          }
          if (bgOverlay) bgOverlay.style.display = 'block';
          if (starCanvas) starCanvas.style.display = 'none';
          if (typeof window.pauseStarfield === 'function') {
            window.pauseStarfield();
          }
        } else {
          // Switch back to starfield
          if (starCanvas) {
            if (!reduceMotion) {
              starCanvas.style.opacity = '0';
              starCanvas.style.transition = 'opacity 1.2s cubic-bezier(.4,0,.2,1)';
              setTimeout(() => {
                starCanvas.style.display = 'block';
                starCanvas.style.opacity = '1';
                if (typeof window.resumeStarfield === 'function') {
                  window.resumeStarfield();
                }
              }, 50);
            } else {
              starCanvas.style.display = 'block';
              starCanvas.style.opacity = '1';
              starCanvas.style.transition = 'none';
              if (typeof window.resumeStarfield === 'function') {
                window.resumeStarfield();
              }
            }
          }
          if (bgOverlay) bgOverlay.style.display = 'block';
        }

        if (prevVideo) {
          if (!reduceMotion) {
            prevVideo.style.opacity = '0';
            setTimeout(() => {
              if (prevVideo.parentNode) prevVideo.parentNode.removeChild(prevVideo);
            }, 1200);
          } else {
            if (prevVideo.parentNode) prevVideo.parentNode.removeChild(prevVideo);
          }
        }

        if (!bgVideos[nextIndex]) {
          if (!reduceMotion) {
            setTimeout(() => { bgContainer.innerHTML = ''; }, 1200);
          } else {
            bgContainer.innerHTML = '';
          }
        }
      } catch (error) {
        console.error('Error during background crossfade:', error);
      }
    }

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        try {
          bgIndex = (bgIndex + 1) % bgVideos.length;
          crossfadeBg(bgIndex);
        } catch (error) {
          console.error('Error toggling background:', error);
        }
      });
    }

    if (bgOverlay) {
      bgOverlay.style.display = 'block';
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (starCanvas) {
        starCanvas.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Error initializing background system:', error);
  }
})();
