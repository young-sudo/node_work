$(document).ready(function(){
    $('.img_qq').click(function(){
        $('.img_qq_big')[0].style.display ="block";
     })
     $('.img_qq_big').click(function(){
       $(this)[0].style.display ="none";

    })
    $('.set_div').click(function(){
        $('.settype_div')[0].style.display ='block';
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