$(document).ready(function () {
  const $txt = $('#styledText');

  // Font sizes
  $('#sizeSmall').on('click', function () {
    $txt.css('font-size', '0.85rem').css('line-height', '1.6');
  });
  $('#sizeMedium').on('click', function () {
    $txt.css('font-size', '1.1rem').css('line-height', '1.75');
  });
  $('#sizeLarge').on('click', function () {
    $txt.css('font-size', '1.5rem').css('line-height', '1.7');
  });
  $('#sizeXL').on('click', function () {
    $txt.css('font-size', '2rem').css('line-height', '1.5');
  });

  // Text color — chaining: find text, change color, add transition
  $('.color-btn').on('click', function () {
    const color = $(this).data('color');
    $txt.css('color', color).css('transition', 'color 0.3s ease');
  });

  // Background — chaining: change bg, adjust border color
  $('.bg-btn').on('click', function () {
    const bg = $(this).data('bg');
    $txt.css('background', bg).css('border-color', bg);
  });

  // Toggle Bold — chaining demo
  $('#toggleBold').on('click', function () {
    $(this).toggleClass('active');
    const isBold = $txt.css('font-weight') === '700' || $txt.css('font-weight') === 'bold';
    $txt.css('font-weight', isBold ? '400' : '700').css('letter-spacing', isBold ? 'normal' : '-0.3px');
  });

  // Toggle Italic — chaining
  $('#toggleItalic').on('click', function () {
    $(this).toggleClass('active');
    const isItalic = $txt.css('font-style') === 'italic';
    $txt.css('font-style', isItalic ? 'normal' : 'italic');
  });

  // Toggle Underline — chaining
  $('#toggleUnderline').on('click', function () {
    $(this).toggleClass('active');
    const hasUnderline = $txt.css('text-decoration').includes('underline');
    $txt.css('text-decoration', hasUnderline ? 'none' : 'underline');
  });

  // Toggle Shadow — chaining multiple properties
  $('#toggleShadow').on('click', function () {
    $(this).toggleClass('active');
    const hasShadow = $txt.css('text-shadow') !== 'none';
    $txt
      .css('text-shadow', hasShadow ? 'none' : '0 0 20px rgba(124,106,247,0.8), 0 0 40px rgba(124,106,247,0.4)')
      .css('transition', 'text-shadow 0.4s ease');
  });

  // Reset all — chain everything at once
  $('#resetAll').on('click', function () {
    $txt
      .css('font-size', '1.1rem')
      .css('line-height', '1.75')
      .css('color', '#ffffff')
      .css('background', '#1a1a2e')
      .css('border-color', '#2a2a44')
      .css('font-weight', '400')
      .css('font-style', 'normal')
      .css('text-decoration', 'none')
      .css('text-shadow', 'none')
      .css('letter-spacing', 'normal');

    $('.ctrl-btn').removeClass('active');
  });

});