$(document).ready(function () {
    //提交时
    var inp_arr = [];
    $('#but_sub').click(function () {
        if (c_name && c_number && c_sex && c_score && c_exam && c_type) {
            $('input').each(function () {         //0-5
                inp_arr.push($(this).val())
            })
            // console.log(inp_arr);
            var name_ = inp_arr[0];
            var number_ = inp_arr[1];
            var sex_ = inp_arr[2];
            var score_ = inp_arr[3];
            var exam_ = inp_arr[4];
            var type_ = inp_arr[5];
            $.ajax({
                type: 'post',
                url: '/grade/addgrade',
                data: {
                    name: name_,
                    number: number_,
                    sex:sex_,
                    score: score_,
                    exam: exam_,
                    type:type_
                },
                success: function (data) {
                    alert(data)
                }
            })
        } else {
            alert('请仔细填写信息')
        }
    })
    // 提前验证
    //Ajax  1,检查学生名字是否存在；2，检查学生编号是否存在；
    //js     3，检查学生性别是否符合；4，检查学生成绩是否符合 4,检查考试类型是否符合；5，检查学生考试科目是否符合
    //  1,
    var c_name = false;
    var c_number = false;
    var c_sex = false;
    var c_score = false;
    var c_type = false;
    var c_exam = false;

    $('input')[0].onblur = function () {
        c_name = check_name(this);
    };
    $('input')[1].onblur = function () {
        c_number = check_number(this);
    };
    $('input')[2].onblur = function () {
        c_sex = check_sex(this);
    };
    $('input')[3].onblur = function () {
        c_score = check_score(this, 3, 'red', 'green', { condition: '', data: '不能为空！' }, { condition1: 0, condition2: 100, data: '满分为100分' }, 'success');
    };
    $('input')[4].onblur = function () {
        c_exam = check_exam(this);
    };
    $('input')[5].onblur = function () {
        c_type = check_type(this);
    };



})
//方法
function check_name(i) {
    $('span')[0].style.color = 'red';
    var i_name = i;
    var _name = i.value;
    var flag = true;
    if (_name != '') {
        $.get('/grade/name', { data: _name }, function (data) {
            if (data == '-1') {
                flag = false;
                i_name.value = '';
                $('span')[0].innerHTML = '他不是学生！';
            } else if (data == '-2') {
                flag = false;
                i_name.value = '';
                $('span')[0].innerHTML = '没有此人,请重新输入.';
            } else {
                flag = true;
                $('span')[0].style.color = 'green';
                $('span')[0].innerHTML = 'success';
            }
        })
    } else {
        $('span')[0].innerHTML = '不能为空';
        flag = false;
    }
    return flag;
};

function check_number(i) {
    $('span')[1].style.color = 'red'
    var i_number = i;
    var _number = i.value;
    var flag = true;
    if (_number != '') {
        $.get('/grade/number', { data: _number }, function (data) {
            if (data != '0') {
                flag = false;
                i_number.value = '';
                $('span')[1].innerHTML = '没有此编号！';
            } else {
                flag = true;
                $('span')[1].style.color = 'green';
                $('span')[1].innerHTML = 'success';
            }
        })
    } else {
        flag = false;
        $('span')[1].innerHTML = '不能为空';
    }
    return flag;
};

function check_sex(i) {
    $('span')[2].style.color = 'red'
    var i_sex = i;
    var _sex = i.value;
    var flag = true;
    if (_sex != '男' && _sex != '女') {
        flag = false;
        $('span')[2].innerHTML = '性别只能为男或女';
        i_sex.value = '';
    } else if (_sex == '') {
        $('span')[2].innerHTML = '不能为空！';
    } else {
        $('span')[2].style.color = 'green';
        $('span')[2].innerHTML = 'success';
    }
    return flag;
};

//  封装一个check_all()方法
//  th:this;   col:原本字体颜色;  s_col:成功后的字体颜色； err1：错误1；  err2：错误2；  suc：成功内容
// 失败
function check_score(th, num, col, s_col, err1, err2, suc) {
    var c = $('span')[num].style;
    c.color = col;
    var text = $('span')[num];
    var i_value = th;
    var value = th.value;
    var flag = true;
    if (value == err1.condition) {
        text.innerHTML = err1.data;
        flag = false;
    } else if (value < err2.condition1 || value > err2.condition2) {
        i_value.value = '';
        text.innerHTML = err2.data;
        flag = false;
    } else {
        c.color = s_col;
        text.innerHTML = suc;
    }
    return flag;
}

function check_exam(i) {
    var c = $('span')[4].style;
    c.color = 'red';
    var text = $('span')[4];
    var i_value = i;    //input
    var value = i.value;    //input value
    var flag = true;
    if (value == '') {
        text.innerHTML = '不能为空！';
        flag = false;
    } else if (value != '月考' && value != '周考' && value != '期中考' && value != '期末考' && value != '联考') {
        i_value.value = '';       //将input value转为空
        text.innerHTML = '考试类型填写错误';
        flag = false;
    } else {
        c.color = 'green';
        text.innerHTML = 'success';
    }
    return flag;
};

function check_type(i) {
    var c = $('span')[5].style;
    c.color = 'red';
    var text = $('span')[5];
    var i_value = i;    //input
    var value = i.value;    //input value
    var flag = true;
    if (value == '') {
        text.innerHTML = '不能为空！';
        flag = false;
    } else if (value != '语文' && value != '数学' && value != '英语' && value != '物理' && value != '化学'
        && value != '生物' && value != '历史' && value != '地理' && value != '政治' && value != '体育') {
        i_value.value = '';       //将input value转为空
        text.innerHTML = '考试科目填写错误';
        flag = false;
    } else {
        c.color = 'green';
        text.innerHTML = 'success';
    }
    return flag;
};