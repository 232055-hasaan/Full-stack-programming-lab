document.getElementById('edit-account-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  [['ea-fname','ea-fname-err'],['ea-lname','ea-lname-err'],['ea-email','ea-email-err'],['ea-currpass','ea-currpass-err']].forEach(([id,errId]) => {
    const el = document.getElementById(id), err = document.getElementById(errId);
    el.classList.remove('error'); err.classList.remove('show');
    if (!el.value.trim()) { el.classList.add('error'); err.textContent='Required.'; err.classList.add('show'); valid=false; }
    else if (id==='ea-email' && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) { el.classList.add('error'); err.textContent='Valid email required.'; err.classList.add('show'); valid=false; }
  });
  const np=document.getElementById('ea-newpass'), cp=document.getElementById('ea-confpass'), cpe=document.getElementById('ea-confpass-err');
  if (np.value && np.value !== cp.value) { cp.classList.add('error'); cpe.textContent='Passwords do not match.'; cpe.classList.add('show'); valid=false; }
  if (valid) { showFlash('Profile updated successfully!', 'success'); }
});
