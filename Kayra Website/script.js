const gridContainer = document.getElementById('grid-container');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
 
// Open lightbox on any grid-item click (event delegation — works for all items)
gridContainer.addEventListener('click', function (e) {
  const item = e.target.closest('.grid-item');
  if (!item || item.classList.contains('empty')) return;
 
  const img = item.querySelector('img');
  if (!img || !img.src) return;
 
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scroll behind lightbox
});
 
// Close on backdrop click
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) closeLightbox();
});
 
// Close on × button
lightboxClose.addEventListener('click', closeLightbox);
 
// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
 
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  // Small delay so the animation plays before clearing the src
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}