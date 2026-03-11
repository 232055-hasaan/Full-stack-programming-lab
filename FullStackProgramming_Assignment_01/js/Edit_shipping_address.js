document.getElementById('shipping-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const ids = ['shipping-form-fn','shipping-form-ln','shipping-form-em','shipping-form-ph','shipping-form-ci','shipping-form-st','shipping-form-zp','shipping-form-co'];
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
