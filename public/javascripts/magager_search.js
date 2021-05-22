var searchInp = document.getElementById('search');
// console.log(searchInp)
var timer =null;

searchInp.oninput = function () {
    //  console.log($(this))          //input
    // console.log(this.value) 
    clearTimeout(timer);  
    var keys = this.value;

    function ajax(options) {
        options = options || {};  //调用函数时如果options没有指定，就给它赋值{},一个空的Object
        options.type = (options.type || "GET").toUpperCase();/// 请求格式GET、POST，默认为GET
        options.dataType = options.dataType || "json";    //响应数据格式，默认json

        var params = formatParams(options.data);//options.data请求的数据

        var xhr;

        //考虑兼容性
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveObject) {//兼容IE6以下版本
            xhr = new ActiveXobject('Microsoft.XMLHTTP');
        }

        //启动并发送一个请求
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("post", options.url, true);

            //设置表单提交时的内容类型
            //Content-type数据请求的格式
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }

        //    设置有效时间
        setTimeout(function () {
            if (xhr.readySate != 4) {
                xhr.abort();
            }
        }, options.timeout)

        //    接收
        //     options.success成功之后的回调函数  options.error失败后的回调函数
        //xhr.responseText,xhr.responseXML  获得字符串形式的响应数据或者XML形式的响应数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300 || status == 304) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.error && options.error(status);
                }
            }
        }
    }

    //格式化请求参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");

    }

    if (keys != '') {
        timer =setTimeout(function(){
            ajax({
                url: "http://localhost:3000/magager/search",
                type: 'post',
                data: {
                    key: keys
                },
                dataType: 'json',
                timeout: 10000,
                contentType: "application/json",
                success: function (data) {
                    if (data == 'null') {
                     document.getElementsByClassName('table')[0].innerHTML ='<p style="text-align: center;color: red;font-size: 100px;line-height:489px">没有数据</p>'
                     searchInp.onblur=setTimeout(function(){
                        window.location.href='/magager'
                     },1000)
                    } else {
                        arr = JSON.parse(data);
                        update();
                        del();
                    }
                },
                //异常处理
                error: function (e) {
                    console.log(e);
                }
            })
        },1000)
        
    }
}

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


