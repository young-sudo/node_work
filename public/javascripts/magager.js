var arr = [];
var New_identity = '';
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
        New_identity = '学生';
        $.ajax({
            type: 'post',
            url: '/magager/student',
            dataType: "json",
            success: function (data) {
                // console.log(data)
                arr = data.text;
                update();
                del();
                change();
                repir_page(data)
            }
        })
        $('.page_p')[0].innerHTML = 1;          //刷新页码
    })
})

//老师
$(function () {
    $('#teacher').click(function () {
        New_identity = '老师';
        $.ajax({
            type: 'post',
            url: '/magager/teacher',
            dataType: "json",
            success: function (data) {
                arr = data.text;
                update();
                del();
                change();
                repir_page(data);
            }
        })
        $('.page_p')[0].innerHTML = 1;
    })
})
//管理员
$(function () {
    $('#mamager').click(function () {
        New_identity = '管理员';
        $.ajax({
            type: 'post',
            url: '/magager/magager',
            dataType: "json",
            success: function (data) {
                arr = data.text;
                update();
                del();
                change();
                repir_page(data);
            }
        })
        $('.page_p')[0].innerHTML = 1;
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
    var table = $('.showData')[0];
    var rows = table.rows;//获取所有行
    // console.log("lenth", rows.length)

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];//获取每一行
        var list = row.cells; //获取每一列
        for (var j = 0; j < list.length - 1; j++) {  //除去删除按钮
            // var td = list[j].innerHTML;//获取具体单元格    string
            // console.log(td)
            var td_input = list[j].children[0]
            // console.log(td_input)      //获取具体单元格    odject  
            td_input.onchange = function () {
                var c_value = this.value;          // 用户改变了的值
                var c_id = this.parentNode.parentNode.children[0].children[0].attributes[1];  // c_user.value= ？这种方式才可以改变原有的id值。
                //c_index      用户改变的input框所在的列的下标，然后获得它所代表的列的value，即id，user等
                // 由于本人数据库数据修改时，用的是where=id。即只要修改id的原始值即可，其它的可用可不用。所以没有改。
                var a = this;
                var b = this.parentNode.parentNode.children;
                function _index() {
                    for (var k = 0; k < list.length - 1; k++) {
                        if (a == b[k].children[0]) {
                            return k;
                        }
                    }
                }
                var c_index = _index();
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

                $.ajax({
                    type: 'post',
                    url: "/magager/change",
                    data: {
                        value: c_value,
                        index: c_index,
                        id: c_id.value
                    },
                    success: function (data) {
                        //错误就刷新页面
                        if (data != 'success') {
                            window.location.href = '/magager/';
                        }
                        if (c_index == 'id') {
                            c_id.value = c_value; //改变原有input的 user值
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
//md5转换
$(document).ready(function () {
    $(".flip").click(function () {
        $(".panel").slideToggle("slow");
    });
    $('#before_pass').blur(function () {
        $.post('/magager/password', { data: $(this).val() }, (data) => {
            $("#after_pass").val(data)
        })
    })

});

$(document).ready(function () {
    var n = 1; //第几页

    //sort排序 
    $('.asc_desc').each(function () {
        var i = 0;
        $(this).click(function () {
            // console.log(New_identity)   // 解决了双Ajax请求数据冲突，即选择身份后的排序失去身份前提
            // console.log(i);   // 点击不同列的i不相同
            i++;
            let type = $(this)[0].innerHTML;
            var identity = New_identity;
            sort(i, type, identity);

            $('.page_p')[0].innerHTML = 1;          //刷新页码,并刷新页数n
            n = 1;
        })
    })
    //分页   凡是重新请求数据，页码都需要刷新。即选择身份与排序时将n =1，page = 1；
    $('.paging').each(function () {          //5 td
        $(this).click(function () {
            var page = +$('.page_num').attr('page');   //页码
            console.log('页码', page);
            let text = $(this)[0].innerHTML;
            if (text == '首页') {
                n = 1;
            } else if (text == '尾页') {
                n = page;
            } else if (text == '上一页') {
                n = n - 1;
            } else if (text == '下一页') {
                n = n + 1;
            } else {
                n = parseInt(text)
            }

            if (n < 1) {
                n = 1;
                alert('已经是第一页了');
            } else if (n > page) {
                n = page;
                alert('已经是最后一页了');
            } else {
                $.post('/magager/paging', { page: n, identity: New_identity }, (data) => {
                    arr = data;
                    update();
                    del();
                    change();

                })
            }
            $('.page_p')[0].innerHTML = n;
        })
    })

})

function sort(i, ty, identity) {     //h 排序方式  ty 排序类型 id,age createtime
    if (i % 2 != 0) {  //奇数 降序 sort
        h = 'DESC';
    } else {
        h = 'ASC';
    }
    //由于前端页面 需将createTime，logoutTime 转换成create_time,logout_time
    if (ty == 'createTime') {
        ty = 'create_time';
    } else if (ty == 'logoutTime') {
        ty = 'logout_time';
    } else {
        ty = ty;
    }
    $.get('/magager/desc', { sort: h, type: ty, identity: identity }, (data) => {
        arr = data
        update();
        del();
        change();
    })
}
function repir_page(data) {
    let page = parseInt((data.page[0].sum / 10)) + 1;
    //修改html
    $('.page_num').attr('page', page);
    $('.page_text')[0].innerHTML = "共" + page + "页";
}