$(document).ready(function () {

  const images = [
    { src: 'https://picsum.photos/seed/gallery1/700/440', caption: 'Golden hour over misty mountains' },
    { src: 'https://picsum.photos/seed/gallery2/700/440', caption: 'Silent waters at dawn' },
    { src: 'https://picsum.photos/seed/gallery3/700/440', caption: 'Whispering forests of the north' },
    { src: 'https://picsum.photos/seed/gallery4/700/440', caption: 'City lights reflecting on rain-soaked streets' },
    { src: 'https://picsum.photos/seed/gallery5/700/440', caption: 'Desert sands sculpted by ancient winds' },
  ];

  let current = 0;

  // Build dots
  images.forEach((_, i) => {
    $('<div class="dot"></div>').on('click', function () {
      goTo(i);
    }).appendTo('#dots');
  });

  function updateDots() {
    $('.dot').removeClass('active').eq(current).addClass('active');
  }

  function updateCounter() {
    $('#counter').text((current + 1) + ' / ' + images.length);
  }

  function goTo(index) {
    current = (index + images.length) % images.length;

    $('#galleryImg').fadeOut(300, function () {
      $(this).attr('src', images[current].src).fadeIn(400);
    });

    $('#caption').fadeOut(200, function () {
      $(this).text(images[current].caption).fadeIn(300);
    });

    updateDots();
    updateCounter();
  }

  $('#prevBtn').on('click', function () { goTo(current - 1); });
  $('#nextBtn').on('click', function () { goTo(current + 1); });

  // Init
  goTo(0);
});