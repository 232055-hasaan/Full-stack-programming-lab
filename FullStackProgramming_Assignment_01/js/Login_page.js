// Login Page JS
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  [['login-email','login-email-err'],['login-pass','login-pass-err']].forEach(([id,errId]) => {
    const el = document.getElementById(id), err = document.getElementById(errId);
    el.classList.remove('error'); err.classList.remove('show');
    if (!el.value.trim()) { el.classList.add('error'); err.textContent = 'This field is required.'; err.classList.add('show'); valid = false; }
    else if (id==='login-email' && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) { el.classList.add('error'); err.textContent = 'Valid email required.'; err.classList.add('show'); valid = false; }
  });
  if (valid) { showFlash('Login successful! Redirecting...', 'success'); setTimeout(() => location.href = 'My_Account.html', 1500); }
});
document.addEventListener('DOMContentLoaded', () => initCarousel('login-carousel'));
