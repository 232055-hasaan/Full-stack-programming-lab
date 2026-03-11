// Register JS
document.getElementById('register-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  const fields = [
    {id:'reg-email',errId:'reg-email-err',type:'email'},
    {id:'reg-pass',errId:'reg-pass-err',minLen:6},
    {id:'reg-pass2',errId:'reg-pass2-err'},
    {id:'reg-fname',errId:'reg-fname-err'},
    {id:'reg-lname',errId:'reg-lname-err'}
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id), err = document.getElementById(f.errId);
    el.classList.remove('error'); err.classList.remove('show');
    if (!el.value.trim()) { el.classList.add('error'); err.textContent = 'Required.'; err.classList.add('show'); valid = false; }
    else if (f.type==='email' && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) { el.classList.add('error'); err.textContent = 'Valid email required.'; err.classList.add('show'); valid = false; }
    else if (f.minLen && el.value.length < f.minLen) { el.classList.add('error'); err.textContent = `Min ${f.minLen} characters.`; err.classList.add('show'); valid = false; }
  });
  const p1 = document.getElementById('reg-pass'), p2 = document.getElementById('reg-pass2'), e2 = document.getElementById('reg-pass2-err');
  if (valid && p1.value !== p2.value) { p2.classList.add('error'); e2.textContent = 'Passwords do not match.'; e2.classList.add('show'); valid = false; }
  if (valid) { showFlash('Account created successfully!', 'success'); setTimeout(() => location.href = 'Login_page.html', 1500); }
});
