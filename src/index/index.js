require('./index.css');
(function() {
  $(function() {
    $('.nav-tab').on('click', function(e) {
      $('.nav-tab').css('color', '#d8d8d8');
      $(this).css('color', '#df846c');
      $('.logo').stop().animate({
        'margin-top': -120
      }, function() {
        $('.logo').hide();
        $('.searchBox').hide();
        $('.open').css('display', 'inline-block');
      });
      // $('.main').html('');
    });
    $('#youthcode').on('mouseover', function() {
      $('.subnav').css('display', 'block');
    })
    $(document).pjax('a[data-pjax]', '.main');

  })
})();
