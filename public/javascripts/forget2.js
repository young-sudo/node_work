$(document).ready(function () {
    $('#hx_div1')[0].style.backgroundColor = 'green';
    var c_phone = false;

    var phone = $('.inp_phone')
    phone.blur(function () {
        c_phone = check_phone(this)
    })
    function check_phone(i) {
        var flag = true;
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone.val())) {
            flag = false;
        }
        return flag;
    }


    $('#but_pass').click(function () {
        var phone = $('.inp_phone').val();
        if (phone != '') {
            if (c_phone) {
                $('#p_pass')[0].innerHTML = code();
                $('#but_pass')[0].value = '10秒后消失';
                setTimeout(function () {
                    $('#p_pass')[0].innerHTML = '&nbsp;';
                    $('#but_pass')[0].value = '重新获取';
                }, 10000)
            } else {
                $('#span')[0].innerHTML = '电话号码格式错误。'
                setTimeout(function () {
                    $('.inp_phone').val('');
                    $('#span')[0].innerHTML = '';
                }, 2000)
            }
        }
    })
    $('#but_before').click(function () {
        window.history.back();
    })
    $('#but_sub').click(function () {
        var phone = $('.inp_phone').val();
        var pass = $('#inp_pass').val();
        if (phone != '') {
            if ($('#p_pass')[0].innerHTML == pass) {
                // console.log(user)
                $.ajax({
                    type: 'get',
                    url: '/forget/check2',
                    data: { ind: phone },
                    success: function (data) {
                        forget_next(data)
                    }
                })
            } else {
                alert('验证码错误')
            }
        } else {
            alert('请填写电话号码')
        }

    })
    function forget_next(a) {
        if (a != '-1') {
            $('#but_next')[0].style = 'block';
        } else {
            alert('电话号码错误')
        }
    }
    //下一步
    $('#but_next').click(function () {
        window.location.href = '/forget/third';
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
