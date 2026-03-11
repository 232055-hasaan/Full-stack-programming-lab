document.getElementById('billing-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const ids = ['billing-form-fn','billing-form-ln','billing-form-em','billing-form-ph','billing-form-ci','billing-form-st','billing-form-zp','billing-form-co'];
  let valid = true;
  ids.forEach(id => {
    const el = document.getElementById(id), err = document.getElementById(id+'-err');
    if (!el) return;
    el.classList.remove('error');
    if (err) err.classList.remove('show');
    if (!el.value.trim()) {
      el.classList.add('error');
      if (err) { err.textContent='Required.'; err.classList.add('show'); }
      valid = false;
    }
  });
  if (valid) { showFlash('Address updated successfully!', 'success'); setTimeout(()=>location.href='My_Account.html',1500); }
});
