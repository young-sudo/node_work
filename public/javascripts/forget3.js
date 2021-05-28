$(document).ready(function () {
    $('#but_sub').click(function () {
        var new_pass = $('#new_pass').val()
        var re_pass = $('#re_pass').val()
        if (new_pass != '' && re_pass != '') {
            if (new_pass.length < 6) {
                $('#s_span')[0].style.color = 'red';
                $('#s_span')[0].innerHTML = '密码至少6位';
                reture;
            }
            if (new_pass == re_pass) {
                $.ajax({
                    type: 'post',
                    url: '/forget/check3',
                    data: {
                        password: new_pass
                    },
                    success: function (data) {
                        if (data != -1) {
                            $('#but_next')[0].style.display = 'block';
                            $('#s_span')[0].style.color = 'green';
                            $('#s_span')[0].innerHTML = data;
                        } else {
                            $('#s_span')[0].style.color = 'red';
                            $('#s_span')[0].innerHTML = 'error';
                        }

                    }
                })
            } else {
                $('#s_span')[0].style.color = 'red';
                $('#s_span')[0].innerHTML = '密码不相同';
                setTimeout(function () {
                    $('#s_span')[0].innerHTML = '&nbsp;';
                }, 2000)
            }
        } else {
            $('#s_span')[0].style.color = 'red';
            $('#s_span')[0].innerHTML = '密码不能为空';
            setTimeout(function () {
                $('#s_span')[0].innerHTML = '&nbsp;';
            }, 2000)
        }

    })

    //button
    $('#but_before').click(function () {
        window.history.back();
    })
    $('#but_next').click(function () {
        $('#hx_div3')[0].style.backgroundColor = 'green'
        $('.new_pass')[0].innerHTML = `
       <h1 style="color: green; text-align:center;">完成</h1>
        <h2 style="color: white; text-align:center;">2秒后跳转登陆</h2>
       `
        setTimeout(function () {
            window.location.href = '/login';
        }, 2000)
    })
})
