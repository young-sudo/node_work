$(document).ready(function () {
    f2();
    identity();

    $('#f2').click(function () {
        f2();
        identity();
    })
    $('#f3').click(function () {
        f3();
        identity();
    })

    $('#f1').click(function () {
        window.location.href = "/login";
    })
})

//显示  ‘学生’， 隐藏 ‘老师’
function f2() {
    $('#f2').css("background", "blue");
    $(".f2_fr").attr("style", "display:black")
    $('#f3').css("background", "white");
    $(".f3_fr").attr("style", "display:none")
}
//显示  ‘老师’， 隐藏 ‘学生’
function f3() {
    $('#f3').css("background", "red");
    $(".f3_fr").attr("style", "display:black")
    $('#f2').css("background", "white");
    $(".f2_fr").attr("style", "display:none")
}

//通过colorV方法确定身份
function identity() {
    colorV();
    var indentity;
    if ((color2 == 'rgb(0, 0, 255)') && (color3 == 'rgb(255, 255, 255)')) {
        indentity = '学生';
    } else {
        indentity = '老师';
    }
    $('.identity').attr('value', indentity);



}
//获取颜色 用于判断
function colorV() {
    color2 = $('#f2').css("background-color");
    color3 = $('#f3').css("background-color");

}
