// Contact Us JS
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const fields = [
    {id:'fname', errId:'fname-err'},
    {id:'email', errId:'email-err'},
    {id:'subject', errId:'subject-err'}
  ];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    el.classList.remove('error'); err.classList.remove('show');
    if (!el.value.trim()) {
      el.classList.add('error'); err.textContent = 'This field is required.'; err.classList.add('show'); valid = false;
    } else if (f.id === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value)) {
      el.classList.add('error'); err.textContent = 'Please enter a valid email.'; err.classList.add('show'); valid = false;
    }
  });
  if (valid) {
    showFlash('Message sent successfully! We will get back to you soon.', 'success');
    this.reset();
  }
});
