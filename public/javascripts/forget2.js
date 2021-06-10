$(document).ready(function () {
    $('#hx_div1')[0].style.backgroundColor = 'green';
    var c_Email = false;

    var email = $('.inp_Email');
    email.blur(function () {
        c_Email = check_Email()
    })
    function check_Email() {
        var flag = true;
        if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email.val())) {
            flag = false;
        }
        return flag;
    }


    $('#but_pass').click(function () {
        // console.log(c_Email)
        let Email = email.val();
        if (email != '') {
            if (c_Email) {
                c_Email = false;
                $.get('/forget/check2_email', { data: Email }, (data) => {
                    if (data === '0') {
                        c_Email = true;
                        $('#p_pass')[0].innerHTML = '请在邮箱中查看';
                        let t = 60;
                        let time = setInterval(frame, 1000);
                        function frame() {
                            if (t <= 0) {
                                clearInterval(time);
                                $('#p_pass')[0].innerHTML = '&nbsp;';
                                $('#but_pass')[0].value = '重新获取';
                                c_Email = false;
                            } else {
                                $('#but_pass')[0].value = t + '秒后消失';
                                t--;
                            }
                        }
                    } else {
                        $('#span')[0].innerHTML = '没有该邮箱或邮箱填写错误。';
                        setTimeout(function () {
                            email.val('');
                            $('#span')[0].innerHTML = '';
                        }, 2000);
                    }
                })
            } else {
                $('#span')[0].innerHTML = '邮箱格式错误。'
                setTimeout(function () {
                    email.val('');
                    $('#span')[0].innerHTML = '';
                }, 2000)
            }
        }
    })
    $('#but_before').click(function () {
        window.history.back();
    })
    $('#but_sub').click(function () {
        let _email = $('.inp_Email').val();
        let _pass = $('#inp_pass').val();
        console.log(_email, _pass)
        if (_email != '' && _pass != '') {
            if (c_Email) {
                $.get('/forget/check2_sub', { Email: _email, Pass: _pass }, (data) => {
                    forget_next(data)
                })
            }
        }
    })

    function forget_next(a) {
        if (a != '-1') {
            $('#but_next')[0].style = 'block';
        } else {
            alert('请检查邮箱和验证码')
        }
    }
    //下一步
    $('#but_next').click(function () {
        window.location.href = '/forget/third';
    })
})
