function check() {
      var inp_i = Array.from(document.getElementsByTagName('input')).map(i => i.value);
      // console.log(a)
      if (inp_i[0] == '' && inp_i[1] == '') {
            alert('请填写!');
            return false;
      } else if (inp_i[0] == '' && inp_i[1] != '') {
            alert('请输入用户名!');
            return false;
      } else if (inp_i[0] != '' && inp_i[1] == '') {
            alert('请输入密码!');
            return false;
      } else {
            return true;
      }


}


$(document).ready(function () {
      $('input')[0].onblur = function () {
            var user =$(this).val();
            var inp_value =$(this);
            if (user == '' || user == undefined || user == null) {
                  alert('请填写用户名');
            } else if (user.indexOf(" ") >= 0) {
                  window.location.href= '/login';
                  alert("不能有空格！！！");
            } else {
                  $.ajax({
                        type: 'get',
                        url: '/login/user',
                        data: {
                            key: user
                        },
                        success: function (data) {
                              if(data != 'success'){
                                    inp_value.val('');
                                    alert(data);
                                  
                              }
                        }
                    })
            }
      }
})