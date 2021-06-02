$(document).ready(function () {
    var _user = $('#user')[0].innerHTML;
    var _identity = $('#identity')[0].innerHTML;
    if (_identity == '学生') {
        _identity = 'student';
    } else {
        _identity = 'teacher';
        $('.tea_search_stu')[0].style.display = 'block';
    };

    $('.img_qq').click(function () {
        if ($('.img_qq_big')[0].style.display == "block") {
            $('.img_qq_big')[0].style.display = "none"
        } else {
            $('.img_qq_big')[0].style.display = "block"
        };
    })
    $('.img_qq_big').click(function () {
        $(this)[0].style.display = "none";

    })
    $('.set_div').click(function () {
        if ($('.settype_div')[0].style.display == 'block') {
            $('.settype_div')[0].style.display = 'none';
        } else {
            $('.settype_div')[0].style.display = 'block'
        };
    })
    $('.left_type').each(function () {
        $(this).click(function () {
            // console.log($(this)[0].childNodes[0].data)
            var value_ = $(this)[0].childNodes[0].data;
            if (value_ == '账号详情') {
                window.location.href = '/details';
            } else if (value_ == '问题反馈') {
                if (_identity == 'student') {
                    var but_s_s = $("#set_student_div")[0].style;
                    if (but_s_s.display == 'block') {
                        but_s_s.display = 'none'
                    } else {
                        but_s_s.display = 'block'
                    }
                } else {
                    var but_s_t = $("#set_teacher_div")[0].style;
                    if (but_s_t.display == 'block') {
                        but_s_t.display = 'none'
                    } else {
                        but_s_t.display = 'block'
                    }
                }
            } else {
                $.post("/" + _identity + "/exam",
                    {
                        user: _user,
                        type: value_
                    },
                    function (data, status) {
                        //    console.log(data,status)
                        arr = data;
                        update();
                    });
            }
        })
    })
    $('#addgrade_but').click(function () {
        //    window.open('/grade','newwindow','scrollbars=no,toolbar=no,resizable=no,status=no,width=500,height=500')
        $.ajax({
            type: 'get',
            url: '/grade',
            success: function () {
                window.location.href = '/grade';
            }
        })
    })
    $('#change_grade_but').click(function () {
        window.location.href = '/grade/change_grade';
    })
    //点击按钮查询
    $('#img').click(function () {
        search();
    })

})

function islogout() {
    var r = confirm("确认注销账号？");
    if (r == true) {
        window.location.href = '/magager/islogout';
        return true;
    } else {
        return false;
    }
}

function login() {
    var r = confirm("确认注册一个新账号？");
    if (r == true) {
        window.location.href = '/register';
        return true;
    } else {
        return false;
    }
}
function logout() {
    var r = confirm("确认退出登陆？");
    if (r == true) {
        $.get('/magager/logout', function (data) {
            window.location.href = data;
        });
        return true;
    } else {
        return false;
    }
}

function update() {
    $("#showData")[0].innerHTML = arr.map(i =>
        `
        <tr>
        <td>${i.number}</td>
        <td>${i.name}</td>
        <td>${i.sex}</td>
        <td>${i.type}</td>
        <td>${i.score}</td>
        <td>${i.exam}</td>
    </tr>
    `
    ).join('');
}
//teacher
function search() {
    var search_value = $('#search')[0].value;
    if (search_value != '') {
        $.get('/teacher/search', { data: search_value }, (data) => {
            if (data[0] != undefined) {
                arr = data;
                update()
            } else {
                $('#showData')[0].innerHTML = '<tr><td colspan = "6" style = "color :red; font-size:50px">没有数据</td></tr>';
                setTimeout(function () {
                    window.location = '/teacher';
                }, 1000)
            }
        })
    } else {
        $('#showData')[0].innerHTML = '<tr><td colspan = "6" style = "color :red; font-size:50px">请填写</td></tr>'
        setTimeout(function () {
            window.location = '/teacher';
        }, 1000)
    }

}