// backgrounds.js migrated
(function() {
  function getBgVideos() {
    const exts = ['.mp4', '.webm', '.ogg'];
    const files = ['1.mp4','2.mp4','3.mp4','4.mp4','5.mp4','6.mp4'];
    return files.filter(f => exts.some(ext => f.endsWith(ext))).map(f => 'src/assets/bg/' + f);
  }
  const bgVideos = [null, ...getBgVideos()];
  let bgIndex = 0;
  const bgContainer = document.getElementById('bg-video-container');
  const bgOverlay = document.getElementById('bg-overlay');
  const starCanvas = document.getElementById('star-canvas');
  function createBgElement(src) {
    if (!src) return null;
    const video = document.createElement('video');
    video.src = src; video.autoplay = true; video.loop = true; video.muted = true; video.playsInline = true;
    Object.assign(video.style, { position:'fixed', top:'0', left:'0', width:'100vw', height:'100vh', objectFit:'cover', zIndex:'-2', pointerEvents:'none', opacity:'0', transition:'opacity 1.2s cubic-bezier(.4,0,.2,1)'});
    return video;
  }
  function crossfadeBg(nextIndex) {
    const prevVideo = bgContainer.querySelector('video');
    let nextBg = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (bgVideos[nextIndex]) {
      nextBg = createBgElement(bgVideos[nextIndex]);
      bgContainer.appendChild(nextBg);
      if (!reduceMotion) { setTimeout(() => { nextBg.style.opacity = '1'; }, 50); }
      else { nextBg.style.opacity = '1'; nextBg.style.transition = 'none'; }
      bgOverlay.style.display = 'block';
      starCanvas.style.display = 'none';
      if (typeof window.pauseStarfield === 'function') { window.pauseStarfield(); }
    } else {
      if (!reduceMotion) {
        starCanvas.style.opacity = '0'; starCanvas.style.transition = 'opacity 1.2s cubic-bezier(.4,0,.2,1)';
        setTimeout(() => { starCanvas.style.display = 'block'; starCanvas.style.opacity = '1'; if (typeof window.resumeStarfield === 'function') { window.resumeStarfield(); } }, 50);
      } else {
        starCanvas.style.display = 'block'; starCanvas.style.opacity = '1'; starCanvas.style.transition = 'none'; if (typeof window.resumeStarfield === 'function') { window.resumeStarfield(); }
      }
      bgOverlay.style.display = 'block';
    }
    if (prevVideo) {
      if (!reduceMotion) { prevVideo.style.opacity = '0'; setTimeout(() => { if (prevVideo.parentNode) prevVideo.parentNode.removeChild(prevVideo); }, 1200); }
      else { if (prevVideo.parentNode) prevVideo.parentNode.removeChild(prevVideo); }
    }
    if (!bgVideos[nextIndex]) { if (!reduceMotion) { setTimeout(() => { bgContainer.innerHTML = ''; }, 1200); } else { bgContainer.innerHTML = ''; } }
  }
  var toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) { toggleBtn.addEventListener('click', function() { bgIndex = (bgIndex + 1) % bgVideos.length; crossfadeBg(bgIndex); }); }
  if (bgOverlay) { bgOverlay.style.display = 'block'; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { if (starCanvas) { starCanvas.style.display = 'none'; } }
})();
