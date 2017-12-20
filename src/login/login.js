// require('bootstrap'); //这里引入的是js文件
// require('BOOTSTRAP_CSS');
require('./login.css');
let MD5=require('md5.js');
$('.login form').on('submit', function(e) {
  e.preventDefault();
  let [username, password] = [this.username.value.trim(), this.password.value.trim()];
  if (!username || !password) {
    $('#errorMesg').text('用户名或者密码不能为空')
      .show()
      .animate({
        display: 'none'
      }, 1500, function() {
        $(this).hide();
      });
    return;
  }
  password=new MD5().update(password).digest('hex');
  $.ajax({
    url: '/api/user/check',
    method: 'post',
    data: {
      username,
      password
    },
    success: function(data) {
      if (data.success) {
        location.href = '/admin/article-list';
      } else {
        $('#errorMesg').text('用户名或者密码不正确')
          .show()
          .animate({
            display: 'none'
          }, 2000, function() {
            $(this).hide();
          });
      }
    }
  })
});
