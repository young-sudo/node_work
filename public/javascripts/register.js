$(document).ready(function () {
    //提示框字体
    var arrSpan = $('span');
    for (var i = 0; i < arrSpan.length; i++) {
        arrSpan[i].style.color = 'red';
        arrSpan[i].style.fontSize = '16px';
    }
    //提交按钮
    var btn = $('#btn_submit');
    btn.click(function () {
        var identity = $('.identity')[0].value;
        if (check_number && check_name && check_sex && check_age && check_user && check_password && check_repassword && check_Email) {
            $.ajax({
                type: 'post',
                url: '/register',
                data: {
                    number: inp_number.value,
                    name: inp_name.value,
                    sex: inp_sex.value,
                    age: inp_age.value,
                    user: inp_user.value,
                    password: inp_password.value,
                    Email: inp_Email.value,
                    identity: identity
                },
                success: function (data) {
                 if(data == 'err'){
                     alert('error')
                 }else{
                     window.location.href= data;
                 }
                }
            })

        }else{
            if(!check_number){
                alert('请检查你的number')
            }
            if(!check_name){
                alert('请检查你的name')
            }
            if(!check_sex){
                alert('请检查你的sex')
            }
            if(!check_age){
                alert('请检查你的age')
            }
            if(!check_user){
                alert('请检查你的user')
            }
            if(!check_password){
                alert('请检查你的password')
            }
            if(!check_repassword){
                alert('密码不匹配')
            }
            if(!check_Email){
                alert('请检查你的Email')
            }
        }
    })
    //input
    var inp_number = $('input')[0];
    var inp_name = $('input')[1];
    var inp_sex = $('input')[2];
    var inp_age = $('input')[3];
    var inp_user = $('input')[4];
    var inp_password = $('input')[5];
    var inp_repassword = $('input')[6];
    var inp_Email = $('input')[7];

    var check_number = false;
    var check_name = false;
    var check_sex = false;
    var check_age = false;
    var check_user = false;
    var check_password = false;
    var check_repassword = false;
    var check_Email = false;


    //number
    inp_number.onblur = function () {
        check_number = number(this);
    }
    //name
    inp_name.onblur = function () {
        //name 为关键字，用uname
        check_name = uname(this);
    }
    //sex
    inp_sex.onblur = function () {
        check_sex = sex(this);
    }
    //number
    inp_age.onblur = function () {
        check_age = age(this);
    }

    //user
    inp_user.onblur = function () {
        check_user = user(this);
    }
    //password
    inp_password.onblur = function () {
        check_password = password(this);
    }
    //repassword
    inp_repassword.onblur = function () {
        check_repassword = repassword(this, inp_password);
    }
    //phonenumber
    inp_Email.onblur = function () {
        check_Email = Email(this);
    }
})
//////////////////////////////////////////

function number(i) {
    var number = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    if (!/^\d{5,10}$/.test(number)) {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '不能去为空，只能为数字且长度为5-10位';
    } else {
        $.ajax({
            type: 'post',
            url: '/register/number',
            data: {
                key: number
            },
            success: function (data) {
                if (data != 'success') {
                    text.innerHTML = data;
                    text.style.color = 'red';
                }
            }
        })
    }
    return flag;
}


function uname(i) {
    var uname = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    if (uname.length < 1 || uname.length > 6) {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '不能去为空，长度为1-6位';
    } else {
        $.ajax({
            type: 'post',
            url: '/register/name',
            data: {
                key: uname
            },
            success: function (data) {
                if (data != 'success') {
                    text.style.color = 'yellow';
                    text.innerHTML = data;
                }

            }
        })
    }
    return flag;
}
function sex(i) {
    var sex = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    if (sex != '男' && sex != '女') {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '不能去为空，你想你性别还能是啥？';
    }
    return flag;
}
function age(i) {
    var age = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    if (age == '') {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '不能去为空';
    } else if (!/^[0-9]*$/.test(age)) {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '只能为数字';
    } else {
        if (age < 0 || age > 100) {
            flag = false;
            text.style.color = 'red';
            text.innerHTML = '活到100!';
        }
    }
    return flag;
}
function user(i) {
    var user = i.value;       //输入的password
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    var re = /^[a-zA-z]\w{3,15}$/;
    if (!re.test(user)) {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '由字母开头，字母、数字、下划线组成,4-16位';
    } else {
        $.ajax({
            type: 'post',
            url: '/register/user',
            data: {
                key: user
            },
            success: function (data) {
                if (data != 'success') {
                    text.style.color = 'red';
                    text.innerHTML = data;
                }
            }
        })
    }
    return flag;
}

function password(i) {
    var password = i.value;       //输入的password
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    // 是判断最后的校验结果
    // 先校验长度，设置区域为6-10位
    if (password.length < 6 || password.length > 10) {
        // 如果校验没有通过抛出提示
        text.style.color = 'red';
        text.innerHTML = '不能去为空,且密码只能为6-10位';
        flag = false;
    }
    // 判断密码的合法性，只允许输入数字，字母和部分符号
    if (/[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\,\.\/\"\:\;]/g.test(password)) {
        flag = false;
        text.style.color = 'red';
        text.innerHTML = '密码不能输入汉字';
    }
    return flag;
}

function repassword(i, inp_password) {
    var repassword = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    //与password比较
    if (repassword != '' && repassword == inp_password.value) {
        text.innerHTML = 'success';
    } else if (repassword == '') {
        var flag = false;
        text.style.color = 'red';
        text.innerHTML = '请输入密码';
    } else {
        var flag = false;
        text.style.color = 'red';
        text.innerHTML = '密码不相同，请重新输入';
    }
    return flag;
}
function Email(i) {
    var Emailnum = i.value;
    var text = i.parentNode.parentNode.children[2];
    text.style.color = 'green';
    text.innerHTML = 'success';
    var flag = true;
    if (! /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(Emailnum)) {
        text.style.color = 'red';
        text.innerHTML = '邮箱格式错误';
        flag = false;
    }
    return flag;
}