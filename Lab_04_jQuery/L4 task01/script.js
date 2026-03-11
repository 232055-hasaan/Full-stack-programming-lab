$(document).ready(function () {

  function checkEmpty() {
    if ($('#itemList .list-item').length === 0) {
      $('#emptyMsg').fadeIn(200);
    } else {
      $('#emptyMsg').fadeOut(200);
    }
  }

  // Add item on button click
  $('#addBtn').on('click', function () {
    addItem();
  });

  // Add item on Enter key
  $('#itemInput').on('keypress', function (e) {
    if (e.key === 'Enter') addItem();
  });

  function addItem() {
    const text = $('#itemInput').val().trim();
    if (!text) {
      $('#itemInput').css('border-color', '#ff4d6d').val('');
      setTimeout(() => $('#itemInput').css('border-color', '#2a2a38'), 800);
      return;
    }

    const $li = $('<li class="list-item"></li>');
    const $span = $('<span class="item-text"></span>').text(text);
    const $btn = $('<button class="delete-btn">✕</button>');

    $btn.on('click', function () {
      $(this).closest('.list-item').animate({ opacity: 0, height: 0, marginBottom: 0, padding: 0 }, 300, function () {
        $(this).remove();
        checkEmpty();
      });
    });

    $li.append($span).append($btn);
    $('#itemList').prepend($li);
    $('#itemInput').val('').focus();
    checkEmpty();
  }

  // Delete for initial sample item
  $(document).on('click', '.delete-btn', function () {
    $(this).closest('.list-item').animate({ opacity: 0, height: 0, marginBottom: 0, padding: 0 }, 300, function () {
      $(this).remove();
      checkEmpty();
    });
  });

});