function removeItem(el) {
  if (confirm('Remove this item?')) {
    el.closest('.cart-item').remove();
    updateCartTotal();
  }
}
function updateCartTotal() {
  const items = document.querySelectorAll('.cart-item');
  const count = items.length;
  document.querySelector('.cart-total').textContent = `Total: $${count * 9}.00`;
  document.querySelector('.cart-summary p').textContent = `Cart summary (${count} items)`;
}
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('cart-carousel');
  // Show added msg if redirected with item
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('added')) {
    const msg = document.getElementById('cart-added-msg');
    if (msg) { msg.textContent = decodeURIComponent(urlParams.get('added')) + ' was just added to cart.'; msg.style.display='block'; }
  }
});
