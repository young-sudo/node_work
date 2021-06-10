$(document).ready(function () {
    //  $('#body')[0].children[6].children[0].children[1].type = 'password'
    var inp_number = $('#body')[0].children[1].children[0].children[1];
    var inp_name = $('#body')[0].children[2].children[0].children[1];
    var inp_sex = $('#body')[0].children[3].children[0].children[1];
    var inp_age = $('#body')[0].children[4].children[0].children[1];
    var inp_user = $('#body')[0].children[5].children[0].children[1];
    var inp_password = $('#body')[0].children[6].children[0].children[1];
    var inp_Email = $('#body')[0].children[7].children[0].children[1];
    var inp_identity = $('#body')[0].children[8].children[0].children[1];
    var inp_createTime = $('#body')[0].children[9].children[0].children[1];

    //number
    inp_number.onblur = function () {
        console.log($(this).val());
        var number = $(this).val();
        if (number == '' || number == undefined || number == null) {
            alert('请填写编号');
        } else if (number.indexOf(" ") >= 0) {
            alert("编号中不能有空格！！！");
            $(this).val('');
        } else if (number.length > 8 || number.length < 3) {
            alert("编号要在3到8位之间,当前有" + number.length + "位");
        } else {
           
        }
    }
    //name
    inp_name.onblur = function () {
        var name = $(this).val(); 
        if (name == '' || name == undefined || name == null) {
            alert('请填写名字');
        } else if (name.indexOf(" ") >= 0) {
            alert("名字中不能有空格！！！");
            $(this).val('');
        } else if (name.length > 8 || name.length < 1) {
            alert("名字要在1到8位之间,当前有" + name.length + "位");
        } else {
          
        }
    }
    //sex
    inp_sex.onblur = function () {
        var sex = $(this).val();
        if (sex == '' || sex == undefined || sex == null) {
            alert('请填写性别');
        } else if (sex != "男" && sex != "女") {
            alert("除了男或女，你想自己是哪种！！！");
            $(this).val('男');
        } else {
        
        }
    }
     //age
     inp_age.onblur = function () {
        var age = $(this).val();
        if (age == '' || age == undefined || age == null) {
            alert('请填写编号');
        } else if (age <0 || age >200) {
            alert("最多给你活到200岁");
            $(this).val('18');
        } else {
          
        }
    }
    //user
    inp_user.onblur = function () {
        var user = $(this).val(); 
        if (user == '' || user == undefined || user == null) {
            alert('请填写用户名');
        } else if (user.indexOf(" ") >= 0) {
            alert("用户名中不能有空格！！！");
            $(this).val('');
        } else if (user.length > 8 || user.length < 1) {
            alert("用户名要在1到8位之间,当前有" + user.length + "位");
        } else {
          
        }
    }
    //password
    inp_password.onblur = function () {
        var password = $(this).val();
        if (password == '' || password == undefined || password == null) {
            alert('请填写密码');
        } else if (password.length<3 ||password.length >11) {
            alert("密码只能在3-11位之间");
            $(this).val('000');
        } else {
       
        }
    }
     //phonenumber
     inp_Email.onblur = function () {
        var Email = $(this).val();
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (Email == '' || Email == undefined || Email == null) {
            alert('请填写电话号码');
        } else if (!reg.test(Email)) {
            alert("邮箱格式不正确");
        } else {
       
        }
    }
     //identity
     inp_identity.onblur = function () {
        var sex = $(this).val();
        if (sex == '' || sex == undefined || sex == null) {
            alert('请填写性别');
        } else if (sex != "学生" && sex != "老师" && sex !="管理员") {
            alert("只能是学生,老师或管理员！！！");
            $(this).val('学生');
        } else {
           
        }
    }

    //password
    $('#password')[0].type = 'password';
    $('#see_button').click(function(){
       if( $('#password')[0].type == 'password'){
        $('#password')[0].type = 'text';
       }else{
        $('#password')[0].type = 'password';
       }
    })

    //
    $('#but_return').click(function(){
        window.history.back();
    })
});
