$(document).ready(function () {

  // Show first tab on load
  $('#overview').addClass('active');

  $('.tab-btn').on('click', function () {
    const target = $(this).data('target');

    // Update active tab button
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    // Hide all sections, show target
    $('.tab-section').removeClass('active').hide();
    $('#' + target).addClass('active').show();

    // Smooth scroll to section (offset for sticky nav)
    const sectionTop = $('#' + target).offset().top;
    const navHeight = $('#tabNav').outerHeight();

    $('html, body').animate({
      scrollTop: sectionTop - navHeight - 10
    }, 500, 'swing');
  });

});