$(document).ready(function () {
    var _user = $('#user')[0].innerText;
    var _name = $('#user')[0].attributes[2].value;
    let _identity = $('#identity').attr('identity');
    var n = 0;// 分页
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
            let value = $(this)[0].attributes.id.value;
            if (value === 'Account details') {     //value_ == '账号详情'
                window.location.href = '/details';
            } else if (value === 'problem feedback') {          //value_ == '问题反馈'
                if (_identity == 'student') {
                    var but_s_s = $("#set_student_div")[0].style;
                    if (but_s_s.display == 'block') {
                        but_s_s.display = 'none';
                        $('.choseTeacher')[0].style.display = "none";
                    } else {
                        but_s_s.display = 'block';
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
            let value_;         //数据表
                if(value === 'weekly exam'){
                    value_ = '周考';
                }else if(value === 'monthly exam'){
                    value_ = '月考';
                }else if(value === 'mid-term exam'){
                    value_ = '期中考';
                }else if(value === 'final exam'){
                    value_ = '期末考';
                }else if(value === 'united examination'){
                    value_ = '联考';
                }else{
                    console.log('error')
                }
                $.post("/" + _identity + "/exam",
                    {
                        name: _name,
                        type: value_
                    },
                    function (data, status) {
                        arr = data;
                        update();
                    });
                //与下面代码有一定冲突，刷新n
                n = 0;
                $('.page_num').attr('page', 1);
                $('.page_p')[0].innerHTML = 1;
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
            //与下面代码有一定冲突，刷新n
            n = 0;
            $('.page_num').attr('page', 1);
            $('.page_p')[0].innerHTML = 1;
            // 隐藏弹框div
            $('.set_teacher_div')[0].style.display = 'none';
        })
    })
    $('#select_all').click(function () {
        $.get('/grade/selectAll', (data) => {
            arr = data.main;
            update();
            let page = data.page;
            $('.page_num').attr('page', page);
            $('.page_text')[0].innerText = '共' + page + '页';
            // 开始分页模式
            n = 1;
            // 隐藏弹框div
            $('.set_teacher_div')[0].style.display = 'none';
        })
    })
    // 分页
    $('.paging').each(function () {          //5 td
        $(this).click(function () {
            let page = +$('.page_num').attr('page');   //页码总数
            let index_id = $(this)[0].attributes.id.value;
            if (n != 0) { //只有当n !=0时，才允许
                if (index_id === 'homePage') {   //首页
                    n = 1;
                } else if (index_id === 'trailerPage') {      //text == '尾页'
                    n = page;
                } else if (index_id === 'pageUp') {      //text == '上一页'
                    n = n - 1;
                } else if (index_id === 'nextPage') {      //text == '下一页'
                    n = n + 1;
                } else {
                    let text = $(this)[0].innerHTML;  //   text == '首页',尾页,上一页,本页（1）
                    n = parseInt(text)    //本页
                }
                if (n < 1) {
                    n = 1;
                    alert('已经是第一页了');
                } else if (n > page) {
                    n = page;
                    alert('已经是最后一页了');
                } else {
                    $.post('/grade/paging', { page: n }, (data) => {
                        arr = data;
                        update();

                    })
                }
                $('.page_p')[0].innerHTML = n;
            }
        })
    })

    //点击按钮查询
    $('#img').click(function () {
        search();
    })
})
//student
function errGrade() {
    $('.set_student_div')[0].style.display = 'none';
    $('.choseTeacher')[0].style.display = "none";
    $('.errGrade_div')[0].style.display = 'block';
}
function chacha() {  //隐藏发送邮件的div
    $('.errGrade_div')[0].style.display = 'none';
}
function downGrade() {    //学生分数小于60
    let _name = $('#user')[0].attributes[2].value;           //name
    $.get('/student/fail', { name: _name }, (data) => {
        arr = data;
        update();
        $('.set_student_div')[0].style.display = 'none';
        $('.choseTeacher')[0].style.display = "none";
    })
    //与下面代码有一定冲突，刷新n
    n = 0;
    $('.page_num').attr('page', 1);
    $('.page_p')[0].innerHTML = 1;
}
function myteacher() {
    let _name = $('#user')[0].attributes[2].value;
    $.get('/student/myteacher', { name: _name }, (data) => {
        if (data !== '-1') {
            alert('老师姓名：' + data.name + ",老师邮箱: " + data.email);
            $('.set_student_div')[0].style.display = 'none';
            $('.choseTeacher')[0].style.display = "none";
        } else {
            alert('你还没有老师。')
        }
    })
}
//学生选择老师   
$(document).ready(function () {
    let _identity = $('#identity').attr('identity');
    if (_identity === '学生') {
        chose()       //直接提前运行方法
        setTimeout(() => {
            let left_list = $('.ch_left')[0].children[1].children[0].children;  //HTMLCollection(1)
            let right_list = $('.ch_right')[0].children[1].children[0].children;  //HTMLCollection(4)
            $('#left0')[0].style.color = 'green';
            let arr1 = [];
            let arr2 = new Array;
            let arr3 = new Array;
            for (let j = 0; j < left_list.length; j++) {
                let l = $('#left' + j)[0].value;
                arr1.push(l)
            }
            for (let i = 0; i < right_list.length; i++) {
                let r = $('#right' + i)[0].value;
                arr2.push(r)
            }
            for (let i = 0; i < arr2.length; i++) {
                if (arr1.indexOf(arr2[i]) == '-1') {
                    arr3.push(arr2[i]);
                    $('#right' + i)[0].style.color = 'black';             //左边没有为黑色
                } else {
                    $('#right' + i)[0].style.color = 'green';             // 左边有为绿色
                }
            }
            // console.log(arr1);         //左边, 右边 ，右边不包括左边
            // console.log(arr2);
            // console.log(arr3);
            for (let i = 0; i < right_list.length; i++) {
                if ($('#right' + i)[0].attributes.islogout.value === 'yes') {
                    $('#right' + i)[0].style.color = 'gray';
                    $('#right' + i).click(() => {
                        but_readyonly();
                    });
                } else {
                    $('#right' + i).click(() => {
                        right_but_chose($('#right' + i)[0].value, arr1, arr2);
                    });
                }
            }
        }, 1000)
    }
})
function right_but_chose(val, a1, a2) {
    // console.log(val,a1,a2)       //a1左边，a2右边，val值
    // console.log(a1.indexOf(val))
    if (a1.indexOf(val) == '-1') {
        $.get('/student/chose/change', { data: val }, (data) => {
            // $('.ch_left')[0].children[0].children[0].children[0]      //tbody 第二个children
            chose_teacher($('.ch_left'), data, 'left');     //第一个：对象；第二个：数据；第三个：自己起的名字
        })
    }
}
function but_readyonly() {
    alert('该老师账号已注销。')
}
let i = 0;
function but_chose() {
    i++;
    if (i % 2 == 0) {
        $('.choseTeacher')[0].style.display = "none";
    } else {
        $('.choseTeacher')[0].style.display = "block";
    }
}
function chose() {
    let _name = $('#user')[0].attributes[2].value;           //name
    $.get('/student/chose', { data: _name }, (data) => {
        // $('.ch_left')[0].children[0].children[0].children[0]      //tbody 第二个children
        chose_teacher($('.ch_left'), data.myteacher, 'left');     //第一个：对象；第二个：数据；第三个：自己起的名字
        chose_teacher($('.ch_right'), data.teacher, 'right');
    })
}
function chose_teacher(a, array, weizi) {
    a[0].children[1].children[0].innerHTML = array.map((o, i) =>   //第一个child有两个子代h5,tr
        `
        <tr>
            <td><input type="button" value="${o.name}" id="${weizi + i}"></td>
        </tr>
        `
    ).join('');
    for (let i = 0; i < array.length; i++) {
        $('#right' + i).attr('islogout', array[i].islogout);
    }
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
    function score(i) {
        if (i < 60) {
            return `<span style="color:red;">${i}</span>`
        } else {
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
function check() {
    if ($('#s_email').val() != '' && $('#s_text').val() != '') {
        return true;
    }
    return false;
}