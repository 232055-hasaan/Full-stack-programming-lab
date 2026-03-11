document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initCarousel('prod-carousel');
  document.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', function() {
      document.querySelectorAll('.thumb').forEach(x=>x.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
