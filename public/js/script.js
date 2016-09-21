$(function() {
  $('.edit-form').submit(function(e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
      url: url,
      method: 'PUT',
      data: data
    }).done(function() {
      window.location.href = '/tacos';
    });
  });

  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');

    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function() {
      window.location.href = '/tacos';
    });
  });
});
