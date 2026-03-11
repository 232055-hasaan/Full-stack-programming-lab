function toggleShipping() {
  const sec = document.getElementById('shipping-section');
  sec.style.display = document.getElementById('ship-diff').checked ? 'block' : 'none';
}
document.getElementById('payment-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const required = ['pf-fn','pf-ln','pf-em','pf-ph','pf-ad','pf-zp','pf-cn','pf-cv'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('error');
    if (!el.value.trim()) { el.classList.add('error'); valid=false; }
  });
  if (!document.getElementById('accept-tc').checked) { showFlash('Please accept Terms & Conditions.','error'); valid=false; }
  if (valid) { showFlash('Order placed successfully!','success'); setTimeout(()=>location.href='order_summry.html',1500); }
  else { showFlash('Please fill all required fields.','error'); }
});
