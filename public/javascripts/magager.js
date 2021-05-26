var arr = [];
$(document).ready(function () {
    del();
    change();
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
        window.location.href = '/magager';
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
                change();
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
                change();
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
                change();
            }
        })
    })
})
//添加
$(function () {
    $('#add').click(function () {
        window.location.href = '/register';
    })
})
//新数据
function update() {

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
function del() {
    $('.del_button').each(function () {
        $(this)[0].type = 'button';
        $(this).bind("click", function () {
            //  console.log($(this)[0].parentNode.parentNode.children[0].children[0].value)                    //找id
            var ind = parseInt($(this)[0].parentNode.parentNode.children[0].children[0].value);
            window.location.href = '/delete/' + ind;

        })
    })
}
//qq头像处
function display() {
    //必须先判断display = block，应为开始时它没有display属性
    if ($(".gongneng")[0].style.display == 'block') {
       $(".gongneng")[0].style.display = 'none';
    } else {
       $(".gongneng")[0].style.display = 'block';
    }
}
function but_return() {
    window.location.href = '/login';

}
function details() {
    window.location.href = '/details';
}
//修改页面的内容并同步到mysql
function change() {
    var table =$('.showData')[0];
    var rows = table.rows;//获取所有行
    // console.log("lenth", rows.length)

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];//获取每一行
        var list = row.cells; //获取每一列
        for (var j = 0; j < list.length - 1; j++) {  //除去删除按钮
            // var td = list[j].innerHTML;//获取具体单元格    string
            // console.log(td)
            var td_input = list[j].children[0]
            td_input.onchange = function () {
                // console.log(this)             //选中的input
                // console.log(this.value)                //改变后的值
                // console.log(this.parentNode.parentNode)    //改变input所在的tr
                // console.log(this.parentNode.parentNode.children[5].children[0].attributes[1].value)   //改变input所在的tr 的user

                var a = this;
                var b = this.parentNode.parentNode.children;
                function _index() {
                    for (var k = 0; k < list.length - 1; k++) {
                        if (a == b[k].children[0]) {
                            return k;
                        }
                    }
                }
              var  c_index = _index();
                if (c_index == 0) {
                    c_index = 'id';
                } else if (c_index == 1) {
                    c_index = 'number';
                } else if (c_index == 2) {
                    c_index = 'name';
                } else if (c_index == 3) {
                    c_index = 'sex';
                } else if (c_index == 4) {
                    c_index = 'age';
                } else if (c_index == 5) {
                    c_index = 'user';
                } else if (c_index == 6) {
                    c_index = 'password';
                } else if (c_index == 7) {
                    c_index = 'phonenumber';
                } else if (c_index == 8) {
                    c_index = 'identity';
                } else if (c_index == 9) {
                    c_index = 'islogout';
                } else if (c_index == 10) {
                    c_index = 'create_time';
                } else {
                    c_index = 'logout_time';
                }
               var c_value = this.value;
              var  c_user = this.parentNode.parentNode.children[5].children[0].attributes[1].value;

                $.ajax({
                    type: 'post',
                    url: "/magager/change",
                    data: {
                        value: c_value,
                        index: c_index,
                        user: c_user
                    },
                    success: function (data) {
                        //错误就刷新页面
                        if (data != 'success') {
                            window.location.href = '/magager/';
                        }

                    },
                    //异常处理
                    error: function (e) {
                        console.log(e);
                    }
                })
            }
        }
    }

}