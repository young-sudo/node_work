$(document).ready(function () {
    $('#but_pass').click(function () {
        var user = $('#inp_user').val();
        if (user != '') {
            $('#p_pass')[0].innerHTML = code();
            let t = 10;
            let time = setInterval(frame, 1000);
            function frame() {
                if (t <= 0) {
                    clearInterval(time);
                    $('#p_pass')[0].innerHTML = '&nbsp;';
                    $('#but_pass')[0].value = '重新获取';
                } else {
                    $('#but_pass')[0].value = t+'秒后消失';
                    t--;
                }
            }
        }
    })
    $('#but_sub').click(function () {
        var user = $('#inp_user').val();
        var pass = $('#inp_pass').val();
        if (user != '') {
            if ($('#p_pass')[0].innerHTML == pass) {
                // console.log(user)
                $.ajax({
                    type: 'get',
                    url: '/forget/check1',
                    data: { ind: user },
                    success: function (data) {
                        forget_next(data)
                    }
                })
            } else {
                alert('验证码错误')
            }
        } else {
            alert('请填写账号')
        }

    })
    function forget_next(a) {
        if (a != '-1') {
            $('#but_next')[0].style = 'block';
        } else {
            alert('没有该账号')
        }
    }
    //下一步
    $('#but_next').click(function () {
        window.location.href = '/forget/second'
    })

})
//随机六位数
function code() {
    var code = "";
    for (var i = 0; i < 6; i++) {
        var radom = Math.floor(Math.random() * 10);
        code += radom;
    }
    return code;
}