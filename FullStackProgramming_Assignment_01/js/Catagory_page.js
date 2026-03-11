// Category Page JS
document.addEventListener('DOMContentLoaded', function() {
  initCarousel('cat-carousel');
  document.querySelectorAll('.filter-group a').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      this.closest('.filter-group').querySelectorAll('a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
