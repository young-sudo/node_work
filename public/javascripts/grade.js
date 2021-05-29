$(document).ready(function () {
    var inp_arr = [];
    $('#but_sub').click(function () {
        $('input').each(function () {         //0-5
            inp_arr.push($(this).val())
        })
        console.log(inp_arr);
        var name_ = inp_arr[0];
        var number_ = inp_arr[1];
        var sex_ = inp_arr[2];
        var score_ = inp_arr[3];
        var exam_ = inp_arr[4];
        var type_ = inp_arr[5];
//Ajax  1,检查学生名字是否存在；2，检查学生编号是否存在；
//js     3，检查学生性别是否符合；4，检查学生成绩是否符合 4,检查考试类型是否符合；5，检查学生考试科目是否符合
        $.ajax({
            type:'post',
            url:'/teacher/addgrade',
            data: {
                name:name_,
                number:number_,
                sex:sex_,
                score:score_,
                exam:exam_,
                type:type_
            },
            success: function(data){
                alert(data)
            }
        })
    })

})