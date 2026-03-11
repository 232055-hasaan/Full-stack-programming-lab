$(document).ready(function () {

  function updateRanks() {
    $('#sortableList .sort-item').each(function (index) {
      $(this).find('.rank').text(index + 1);
    });
    updateOrderText();
  }

  function updateOrderText() {
    const order = [];
    $('#sortableList .sort-item').each(function () {
      order.push($(this).find('.item-label').text());
    });
    $('#orderText').text(order.map((t, i) => `${i + 1}. ${t}`).join(' → '));
  }

  $('#sortableList').sortable({
    placeholder: 'ui-sortable-placeholder',
    axis: 'y',
    tolerance: 'pointer',
    start: function (e, ui) {
      ui.item.addClass('dragging');
      ui.placeholder.height(ui.item.outerHeight());
    },
    stop: function (e, ui) {
      ui.item.removeClass('dragging');
      updateRanks();
    }
  });

  $('#sortableList').disableSelection();

  // Initial render
  updateOrderText();
});