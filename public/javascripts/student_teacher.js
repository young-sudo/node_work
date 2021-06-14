$(document).ready(function () {
    var _user = $('#user')[0].innerText;
    var _identity = $('#identity')[0].innerText;
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
                        arr = data;
                        update();
                    });
            }
        })
    })
    //teacher
    $('#addgrade_but').click(function () {
        //    window.open('/grade','newwindow','scrollbars=no,toolbar=no,resizable=no,status=no,width=500,height=500')
        window.location.href = '/grade';
    })
    $('#change_grade_but').click(function () {
        window.location.href = '/grade/change_grade';
    })
    $('#select_but').click(function () {
        $.get('/grade/select', (data) => {
            arr = data;
            update();
        })
    })
    $('#select_all').click(function () {
        $.get('/grade/selectAll', (data) => {
            arr = data;
            update();
        })
    })
    //点击按钮查询
    $('#img').click(function () {
        search();
    })
})
//student
function errGrade() {
//    console.log( $('.set_student_div'))
   $('.set_student_div')[0].style.display = 'none';
   $('.errGrade_div')[0].style.display = 'block';
}
function chacha() {  //隐藏发送邮件的div
    $('.errGrade_div')[0].style.display = 'none';
}
function downGrade() {    //学生分数小于60
    let _user = $('#user')[0].innerText;
    $.get('/student/fail',{user:_user},(data)=>{
        arr = data;
        update()
    })
}


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
        <td>${score(i.score)}</td>
        <td>${i.exam}</td>
    </tr>
    `
    ).join('');
    function score(i){
        if(i<60){
            return `<span style="color:red;">${i}</span>`
        }else{
            return `<span style="color:green;">${i}</span>`
        }
    }
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
//student Email
function check(){
    if($('#s_email').val() != '' && $('#s_text').val() != '') {
        return true;
    }
    return false;
}


// 分页
$(document).ready(function(){
    console.log($('.paging'));
    var n=1;
    $('.paging').each(function () {          //5 td
        $(this).click(function () {
            var page = +$('.page_num').attr('page');   //页码
            // console.log('页码', page);
            let text = $(this)[0].innerHTML;
            if (text == '首页') {
                n = 1;
            } else if (text == '尾页') {
                n = page;
            } else if (text == '上一页') {
                n = n - 1;
            } else if (text == '下一页') {
                n = n + 1;
            } else {
                n = parseInt(text)
            }

            if (n < 1) {
                n = 1;
                alert('已经是第一页了');
            } else if (n > page) {
                n = page;
                alert('已经是最后一页了');
            } else {
                $.post('/magager/paging', { page: n, identity: New_identity }, (data) => {
                    arr = data;
                    update();
                    del();
                    change();

                })
            }
            $('.page_p')[0].innerHTML = n;
        })
    })

})