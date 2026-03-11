// ===== HOMEPAGE JS =====
document.addEventListener('DOMContentLoaded', function() {
  // Hero slider
  const slider = document.getElementById('hero-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  let current = 0;

  function showSlide(n) {
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { current = i; showSlide(current); }));
  setInterval(() => { current = (current + 1) % slides.length; showSlide(current); }, 4500);
});

function doSearch() {
  const q = document.getElementById('main-search').value.trim();
  if (q) window.location.href = 'Catagory_page.html';
}
document.getElementById('main-search')?.addEventListener('keypress', e => {
  if (e.key === 'Enter') doSearch();
});
