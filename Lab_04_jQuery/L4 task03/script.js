$(document).ready(function () {

  function validateName() {
    const val = $('#name').val().trim();
    if (!val) {
      setError('#name', '#nameErr', 'Full name is required');
      return false;
    }
    if (val.length < 3) {
      setError('#name', '#nameErr', 'Name must be at least 3 characters');
      return false;
    }
    setValid('#name', '#nameErr');
    return true;
  }

  function validateEmail() {
    const val = $('#email').val().trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setError('#email', '#emailErr', 'Email address is required');
      return false;
    }
    if (!re.test(val)) {
      setError('#email', '#emailErr', 'Enter a valid email address');
      return false;
    }
    setValid('#email', '#emailErr');
    return true;
  }

  function validatePassword() {
    const val = $('#password').val();
    if (!val) {
      setError('#password', '#passwordErr', 'Password is required');
      return false;
    }
    if (val.length < 8) {
      setError('#password', '#passwordErr', 'Password must be at least 8 characters');
      return false;
    }
    setValid('#password', '#passwordErr');
    return true;
  }

  function validateConfirm() {
    const val = $('#confirm').val();
    if (!val) {
      setError('#confirm', '#confirmErr', 'Please confirm your password');
      return false;
    }
    if (val !== $('#password').val()) {
      setError('#confirm', '#confirmErr', 'Passwords do not match');
      return false;
    }
    setValid('#confirm', '#confirmErr');
    return true;
  }

  function setError(inputSel, errSel, msg) {
    $(inputSel).removeClass('is-valid').addClass('is-error');
    $(errSel).text(msg);
  }

  function setValid(inputSel, errSel) {
    $(inputSel).removeClass('is-error').addClass('is-valid');
    $(errSel).text('');
  }

  // Validate on blur
  $('#name').on('blur', validateName);
  $('#email').on('blur', validateEmail);
  $('#password').on('blur', validatePassword);
  $('#confirm').on('blur', validateConfirm);

  // Submit
  $('#submitBtn').on('click', function () {
    const ok = validateName() & validateEmail() & validatePassword() & validateConfirm();
    if (ok) {
      $('#formWrap').fadeOut(300, function () {
        $('#successMsg').fadeIn(400);
      });
    }
  });

});