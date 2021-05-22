$(document).ready(function () {
    //提示框字体
    var arrSpan = $('span');
    for (var i = 0; i < arrSpan.length; i++) {
        arrSpan[i].style.color = 'red';
        arrSpan[i].style.fontSize = '16px';
    }

    // number  
    $('input')[0].onblur = function () {
        var num = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (num == '' || num == undefined || num == null) {
            text.innerHTML = '请填写标识码';

        } else if (num.indexOf(" ") >= 0) {
            text.innerHTML = "输入中有空格！！！";
        } else if (isNaN(num)) {
            text.innerHTML = "请输入纯数字！！！";
        } else if (num.charAt(0) == 0) {
            text.innerHTML = "首位不能为0！！！";
        } else if (parseInt(num) != num) {
            text.innerHTML = "输入的数字中不能为小数！！！";
        } else if (num < 100 || num > 999999999) {
            text.innerHTML = "输入的数字必须在3位以上、10位以内";
        } else {
            $.ajax({
                type: 'post',
                url: '/register/number',
                data: {
                    key: num
                },
                success: function (data) {
                    text.innerHTML = data;
                    if (data == 'success') {
                        text.style.color = 'green';
                    }

                }
            })
        }

    }
    //name
    $('input')[1].onblur = function () {
        var name = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (name == '' || name == undefined || name == null) {
            text.innerHTML = '请填写你的名字'
        } else {
            $.ajax({
                type: 'post',
                url: '/register/name',
                data: {
                    key: name
                },
                success: function (data) {
                    text.innerHTML = data;
                    if (data == 'success') {
                        text.style.color = 'green';
                    } else {
                        text.style.color = 'yellow';
                    }

                }
            })
        }

    }

    //sex
    $('input')[2].onblur = function () {
        var sex = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (sex == '男' || sex == '女') {
            text.innerHTML = 'success,' + '你的性别是' + sex;
            text.style.color = 'green'
        } else if (sex == '' || sex == undefined || sex == null) {
            text.innerHTML = '请填写性别';
        } else {
            text.innerHTML = '性别只能是男或女，除非是你想...'
        }


    }
    //age
    $('input')[3].onblur = function () {
        var age = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (age == '' || age == undefined || age == null) {
            text.innerHTML = '请填写年龄';
        } else if (age.indexOf(" ") >= 0) {
            text.innerHTML = "输入中有空格！！！";
        } else if (isNaN(age)) {
            text.innerHTML = "请输入纯数字！！！";
        } else if (age.charAt(0) == 0) {
            text.innerHTML = "首位不能为0！！！";
        } else if (parseInt(age) != age) {
            text.innerHTML = "输入的数字中不能为小数！！！";
        } else if (age < 0 || age > 200) {
            text.innerHTML = "别想了，最多给你活200岁";
        } else {
            text.style.color = 'green';
            text.innerHTML = "年龄输入正确，你现在 " + age + '岁';

        }
    }

    //user
    $('input')[4].onblur = function () {
        var user = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        $.ajax({
            type: 'post',
            url: '/register/user',
            data: {
                key: user
            },
            success: function (data) {
                text.innerHTML = data;
                if (data == 'success') {
                    text.style.color = 'green';
                }
            }
        })
    }

    //password
    $('input')[5].type = 'password'    //修改password列的type
    $('input')[5].onblur = function () {
        var password = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (password == '' || password == undefined || password == null) {
            text.innerHTML = '请填写密码';

        } else if (password.indexOf(" ") >= 0) {
            text.innerHTML = "密码中不能有空格！！！";
        } else if (isNaN(password)) {
            text.innerHTML = "请输入纯数字！！！";
        } else if (parseInt(password) != password) {
            text.innerHTML = "输入的数字中不能为小数！！！";
        } else if (password.length > 11 || password.length < 4) {
            text.innerHTML = "密码要在4到11位之间,当前有" + password.length + "位";
        } else {
            text.style.color = 'green';
            text.innerHTML = "success";

        }
    }


    //phonenumber
    $('input')[6].onblur = function () {
        var phonenumber = $(this).val();
        var text = this.parentNode.parentNode.children[2];
        text.style.color = 'red';
        if (phonenumber == '' || phonenumber == undefined || phonenumber == null) {
            text.innerHTML = '请填写号码';

        } else if (phonenumber.indexOf(" ") >= 0) {
            text.innerHTML = "输入中有空格！！！";
        } else if (isNaN(phonenumber)) {
            text.innerHTML = "请输入纯数字！！！";
        } else if (parseInt(phonenumber) != phonenumber) {
            text.innerHTML = "输入的数字中不能为小数！！！";
        } else if (phonenumber.length != 11) {
            text.innerHTML = "电话号码为11位,当前有" + phonenumber.length + "位";
        } else {
            text.style.color = 'green';
            text.innerHTML = "success";

        }
    }

})
function check() {
    var r = confirm("确认提交？");
    if (r == true) {
       return true;
    } else {
     return false;
    }
}








