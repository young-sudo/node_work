$(document).ready(function () {
    var searchInp = $('#search')[0];
    var timer = null;

    searchInp.oninput = function () {
        clearTimeout(timer);
        var keys = $(this).val();
        console.log(keys)

        if (keys != '') {
            timer = setTimeout(function () {
                $.ajax({
                    type: 'post',
                    url: '/magager/search',
                    data: {
                        key: keys
                    },
                    dataType: json ,
                    success: function (data) {
                        if (data == 'null') {
                            $('.table')[0].innerHTML = '<p style="text-align: center;color: red;font-size: 100px;line-height:489px">没有数据</p>'
                            searchInp.onblur = setTimeout(function () {
                                window.location.href = '/magager'
                            }, 1000)
                        } else {
                            arr = data;
                            update();
                            del();
                        }
                    },
                    //异常处理
                    error: function (e) {
                        console.log(e);
                    }
                })
            }, 1000)

        }
    }

})


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


