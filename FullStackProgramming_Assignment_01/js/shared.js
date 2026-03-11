// ===== HOTSPRING SHARED JS =====

// Cart state
let cart = JSON.parse(sessionStorage.getItem('hs_cart') || '[]');
let cartCount = cart.reduce((s, i) => s + (i.qty||1), 0);

function updateCartDisplay() {
  const el = document.querySelector('.cart-count');
  if (el) el.textContent = cartCount + ' Item(s)';
}

function addToCart(name, price, qty) {
  qty = qty || 1;
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty = (existing.qty || 1) + qty;
  else cart.push({ name, price, qty });
  cartCount = cart.reduce((s, i) => s + (i.qty||1), 0);
  sessionStorage.setItem('hs_cart', JSON.stringify(cart));
  updateCartDisplay();
  showFlash(name + ' added to cart!', 'success');
}

function showFlash(msg, type) {
  let flash = document.getElementById('flash-msg');
  if (!flash) {
    flash = document.createElement('div');
    flash.id = 'flash-msg';
    flash.style.cssText = 'position:fixed;top:70px;right:20px;z-index:9999;padding:10px 16px;border-radius:3px;font-size:13px;font-weight:600;max-width:300px;box-shadow:0 3px 8px rgba(0,0,0,0.2);';
    document.body.appendChild(flash);
  }
  flash.style.background = type === 'success' ? '#5cb85c' : '#cc0000';
  flash.style.color = '#fff';
  flash.textContent = msg;
  flash.style.display = 'block';
  setTimeout(() => { flash.style.display = 'none'; }, 2500);
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const err = field.parentElement.querySelector('.field-error') ||
                field.closest('.form-group')?.querySelector('.field-error');
    field.classList.remove('error');
    if (err) err.classList.remove('show');
    if (!field.value.trim()) {
      field.classList.add('error');
      if (err) { err.textContent = 'This field is required.'; err.classList.add('show'); }
      valid = false;
    } else if (field.type === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(field.value)) {
      field.classList.add('error');
      if (err) { err.textContent = 'Please enter a valid email.'; err.classList.add('show'); }
      valid = false;
    }
  });
  return valid;
}

// Password match validation
function checkPasswordMatch(p1Id, p2Id, errId) {
  const p1 = document.getElementById(p1Id);
  const p2 = document.getElementById(p2Id);
  const err = document.getElementById(errId);
  if (!p1 || !p2) return true;
  if (p1.value !== p2.value) {
    p2.classList.add('error');
    if (err) { err.textContent = 'Passwords do not match.'; err.classList.add('show'); }
    return false;
  }
  return true;
}

// Tabs
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const group = this.closest('.tabs-container');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(this.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// Carousel
function initCarousel(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const track = wrapper.querySelector('.carousel-track');
  const prev = wrapper.querySelector('.carousel-prev');
  const next = wrapper.querySelector('.carousel-next');
  if (!track) return;
  let pos = 0;
  const step = 150;
  if (next) next.addEventListener('click', () => {
    pos = Math.min(pos + step, track.scrollWidth - track.clientWidth);
    track.style.transform = `translateX(-${pos}px)`;
  });
  if (prev) prev.addEventListener('click', () => {
    pos = Math.max(0, pos - step);
    track.style.transform = `translateX(-${pos}px)`;
  });
  track.style.transition = 'transform 0.3s ease';
  track.style.display = 'flex';
  track.style.gap = '10px';
}

// Hero Slider
function initSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  let current = 0;
  function show(n) {
    slides.forEach((s, i) => s.style.display = i === n ? 'block' : 'none');
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
  }
  show(0);
  setInterval(() => { current = (current + 1) % slides.length; show(current); }, 4000);
  dots.forEach((d, i) => d.addEventListener('click', () => { current = i; show(current); }));
}

// Quantity input
function initQtyInputs() {
  document.querySelectorAll('.qty-input').forEach(input => {
    const dec = input.previousElementSibling;
    const inc = input.nextElementSibling;
    if (dec) dec.addEventListener('click', () => input.value = Math.max(1, parseInt(input.value||1) - 1));
    if (inc) inc.addEventListener('click', () => input.value = parseInt(input.value||1) + 1);
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  updateCartDisplay();
  initTabs();
  initQtyInputs();
  // Init all carousels
  document.querySelectorAll('[data-carousel]').forEach(el => initCarousel(el.id));
  // Init hero slider
  if (document.getElementById('hero-slider')) initSlider('hero-slider');
});
