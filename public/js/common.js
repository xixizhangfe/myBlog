$(function() {
  $(document).pjax('a[data-pjax]', 'main');
  $(document).on('pjax:send', function() {
    $('#loading').show()
  })
  $(document).on('pjax:complete', function() {
    $('#loading').hide()
  })
});
