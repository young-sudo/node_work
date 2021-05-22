var arr =[];
$(document).ready(function () {
    del();
    $('#big_div').css('position', 'relative');

    $(".float")[0].children[0].innerHTML = '全部';
    $(".float")[0].children[1].innerHTML = '学生';
    $(".float")[0].children[2].innerHTML = '老师';
    $(".float")[0].children[3].innerHTML = '管理员';
    $(".float")[0].children[4].innerHTML = '添加成员';

})
//颜色
function float(a) {
    a.parentNode.children[0].style.background = 'none';
    a.parentNode.children[1].style.background = 'none';
    a.parentNode.children[2].style.background = 'none';
    a.parentNode.children[3].style.background = 'none';
    a.parentNode.children[4].style.background = 'none';
    a.style.background = 'gray';
}
//全部
$(function () {
    $('#all').click(function () {
       window.location.href='/magager';
    })
})
//学生
$(function () {
    $('#student').click(function () {
        $.ajax({
            type: 'post',
            url: '/magager/student',
            dataType: "json",
            success: function (data) {
               // console.log(data)
                arr = data;
               update();
               del();
            }
        })
    })
})
//老师
$(function () {
    $('#teacher').click(function () {
        $.ajax({
            type: 'post',
            url: '/magager/teacher',
            dataType: "json",
            success: function (data) {
                arr = data;
               update();
               del();
            }
        })
    })
})
//管理员
$(function () {
    $('#mamager').click(function () {
        $.ajax({
            type: 'post',
            url: '/magager/magager',
            dataType: "json",
            success: function (data) {
                arr = data;
               update();
               del();
            }
        })
    })
})
//添加
$(function () {
    $('#add').click(function () {
       window.location.href='/register';
    })
})
//新数据
function update(){
  
    $(".showData")[0].innerHTML = arr.map((i, ind) =>
        `
    <tr ind="${ind}" class="tr">
    <td><input type="text" value="${i.id}"></td>
    <td><input type="text" value="${i.number}"></td>
    <td><input type="text" value="${i.name}"></td>
    <td><input type="text" value="${i.sex}"></td>
    <td><input type="text" value="${i.age}"></td>
    <td><input type="text" value="${i.user}"></td>
    <td><input type="text" value="${i.password}"></td>
    <td><input type="text" value="${i.phonenumber}"></td>
    <td><input type="text" value="${i.identity}"></td>
    <td><input type="text" value="${i.islogout}"></td>
    <td><input type="text" value="${i.create_time}" style="width: 150px;"></td>
    <td><input type="text" value="${i.logout_time}" style="width: 150px;"></td>
    <td><input type="text" class="del_button" ind="${ind}" value="删除"></td>
    </tr>
    `
    ).join('');
}
//删除
function del(){
    $('.del_button').each(function () {
        $(this)[0].type = 'button';
        $(this).bind("click", function () {
            //  console.log($(this)[0].parentNode.parentNode.children[0].children[0].value)                    //找id
            var ind = parseInt($(this)[0].parentNode.parentNode.children[0].children[0].value);
            window.location.href = '/delete/' + ind;

        })
    })
}

// var searchInp = $('#search');
// console.log(searchInp)      k.fn.init {}
// var searchInp = document.getElementById('search');
// console.log(searchInp);     null
function disIdentity(){
   $('#disIdentity')[0].style.display ='block';
}