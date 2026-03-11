// About Us JS
document.addEventListener('DOMContentLoaded', function() {
  // Animate team cards on scroll
  const cards = document.querySelectorAll('.team-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.4s ease ${i*0.1}s, transform 0.4s ease ${i*0.1}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300 + i * 100);
  });
});
