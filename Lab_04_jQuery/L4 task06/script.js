$(document).ready(function () {

  let page = 1;
  const perPage = 5;
  let currentType = 'posts';
  let allData = [];

  function fetchData(type) {
    $('#loader').show();
    $('#loadMore').prop('disabled', true);

    const url = type === 'posts'
      ? 'https://jsonplaceholder.typicode.com/posts'
      : 'https://jsonplaceholder.typicode.com/users';

    $.ajax({
      url: url,
      method: 'GET',
      success: function (data) {
        allData = data;
        page = 1;
        $('#postList').empty();
        $('#endMsg').hide();
        renderPage();
        $('#loader').hide();
      },
      error: function () {
        $('#postList').html('<p style="color:#ff4d6d;padding:20px;">Failed to fetch data. Check your connection.</p>');
        $('#loader').hide();
      }
    });
  }

  function renderPage() {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const slice = allData.slice(start, end);

    slice.forEach(item => {
      let card;
      if (currentType === 'posts') {
        card = `
          <div class="post-card">
            <div class="post-id">#${item.id}</div>
            <div class="post-title">${item.title}</div>
            <div class="post-body">${item.body}</div>
          </div>`;
      } else {
        const initial = item.name.charAt(0).toUpperCase();
        card = `
          <div class="user-card">
            <div class="user-avatar">${initial}</div>
            <div>
              <div class="user-name">${item.name} <span style="color:#aaa;font-weight:300;">@${item.username}</span></div>
              <div class="user-detail">📧 ${item.email} &nbsp;·&nbsp; 🌐 ${item.website}</div>
            </div>
          </div>`;
      }
      $('#postList').append(card);
    });

    if (end >= allData.length) {
      $('#loadMore').hide();
      $('#endMsg').show();
    } else {
      $('#loadMore').show().prop('disabled', false);
    }
  }

  // Tab toggle
  $('.tab-toggle').on('click', function () {
    currentType = $(this).data('type');
    $('.tab-toggle').removeClass('active');
    $(this).addClass('active');
    fetchData(currentType);
  });

  // Load more
  $('#loadMore').on('click', function () {
    page++;
    renderPage();
  });

  // Initial load
  fetchData('posts');
});