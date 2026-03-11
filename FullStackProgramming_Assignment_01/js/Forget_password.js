document.getElementById('forgot-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const el = document.getElementById('fp-email'), err = document.getElementById('fp-email-err');
  el.classList.remove('error'); err.classList.remove('show');
  if (!el.value.trim()) { el.classList.add('error'); err.textContent = 'Email is required.'; err.classList.add('show'); return; }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) { el.classList.add('error'); err.textContent = 'Valid email required.'; err.classList.add('show'); return; }
  showFlash('Password reset link sent to your email!', 'success');
  this.reset();
});
