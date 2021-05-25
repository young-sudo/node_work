$(document).ready(function () {
    var _user = $('#user')[0].innerHTML;
    var _identity = $('#identity')[0].innerHTML;
    if (_identity == '学生') {
        _identity = 'student';
    } else {
        _identity = 'teacher';
    };

    $('.img_qq').click(function () {
       if( $('.img_qq_big')[0].style.display == "block"){
        $('.img_qq_big')[0].style.display = "none"
       }else{
        $('.img_qq_big')[0].style.display = "block"
       };
    })
    $('.img_qq_big').click(function () {
        $(this)[0].style.display = "none";

    })
    $('.set_div').click(function () {
       if( $('.settype_div')[0].style.display == 'block'){
        $('.settype_div')[0].style.display = 'none';
       }else{
        $('.settype_div')[0].style.display = 'block'
       };
    })
    $('.left_type').each(function () {
        $(this).click(function () {
         //   console.log($(this)[0].childNodes[0].data)
            var value_ = $(this)[0].childNodes[0].data;
            if (value_ == '账号详情') {
              window.location.href = '/details';
            } else if (value_ == '问题反馈') {  
               if(_identity == 'student'){
                   alert(1)
               }else{
                   alert(2)
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
        window.location.href = '/login';
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