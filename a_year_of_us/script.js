const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    const img = button.querySelector('img');
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// A few soft floating hearts, kept deliberately subtle.
for (let i = 0; i < 12; i++) {
  const heart = document.createElement('span');
  heart.textContent = '♡';
  heart.setAttribute('aria-hidden', 'true');
  heart.style.cssText = `position:fixed;z-index:0;pointer-events:none;left:${Math.random()*100}%;bottom:-30px;color:#b66e78;opacity:0; font-size:${10+Math.random()*12}px;animation:floatHeart ${12+Math.random()*12}s linear ${Math.random()*15}s infinite`;
  document.body.appendChild(heart);
}
const style = document.createElement('style');
style.textContent = '@keyframes floatHeart{0%{transform:translateY(0) rotate(0);opacity:0}10%{opacity:.18}85%{opacity:.12}100%{transform:translateY(-115vh) rotate(35deg);opacity:0}}';
document.head.appendChild(style);
