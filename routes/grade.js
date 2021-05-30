var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.get('/', (req, res) => {
    var title = { title: '添加' };
    res.render('grade', { key: title });
})

router.get('/change_grade', (req, res) => {
    var title = { title: '修改' };
    res.render('grade', { key: title });
})

router.get('/name', (req, res) => {
    var sql = 'select * from member where name = ' + connection.escape(req.query.data);
    connection.query(sql, (err, rows) => {
        if (err != null) {
            throw err;
        };
        if (rows[0] != undefined) {
            if (rows[0].identity != '学生') {
                res.send('-1');
                return;
            }
            res.send('0');
        } else {
            res.send('-2');
        }
    })
})

router.get('/number', (req, res) => {
    var sql = 'select * from member where number = ' + connection.escape(req.query.data);
    connection.query(sql, (err, rows) => {
        if (err != null) {
            throw err;
        };
        if (rows[0] != undefined) {
            res.send('0');
        } else {
            res.send('-1');
        }
    })
})


router.post('/addgrade', (req, res) => {
    // console.log(req.body);
    var number = req.body.number;
    var name = req.body.name;
    var sex = req.body.sex;
    var score = req.body.score;
    var exam = req.body.exam;
    var type = req.body.type;
    //1，先查看数据是否匹配；2，获取学生id；3，获取学生course_id；4，获取学生exam_id；5，组合，并输入数据库.
    var sql = 'select * from member where number = ' + connection.escape(number) + '&&' + 'name =' + connection.escape(name) + '&&' + 'sex = ' + connection.escape(sex);
    connection.query(sql, (err, rows) => {
        if (err != null) {
            throw err;
        }
        if (rows[0] != undefined) {
            //视图不能该一个基础表以上的数据
            // var user = rows[0].user;
            // var age = rows[0].age;
            // var phonenumber = rows[0].phonenumber;
            // var identity = rows[0].identity;
            // var sql = "INSERT INTO v_student (name,score,exam,type,number,age,sex,user,phonenumber,identity) VALUES(?,?,?,?,?,?,?,?,?,?)";
            // connection.query(sql,[name,score,exam,type,number,age,sex,user,phonenumber,identity],(err,rows) =>{
            //    console.log(err);
            //    console.log(rows)
            // })
            var id = rows[0].id;
            var course_id;
            var exam_id;
            var sql_c = "select id from course where type=" + connection.escape(type);
            connection.query(sql_c, (err, rows) => {
                if (err != null) {
                    throw err;
                }
                course_id = rows[0].id;
                var sql_e = "select id from exam where type=" + connection.escape(exam);
                connection.query(sql_e, (err, rows) => {
                    if (err != null) {
                        throw err;
                    }
                    exam_id = rows[0].id;
                    // console.log(id);     //学生id
                    // console.log(course_id);     //学生course_id
                    // console.log(exam_id)     //学生exam_id
                    // score     //学生成绩
                    //score表中添加数据
                    score = parseInt(score);
                    var sql_s = "INSERT INTO score(member_id,score,course_id,exam_id) VALUES(?,?,?,?)";
                    connection.query(sql_s, [id, score, course_id, exam_id], (err, rows) => {
                        if (err != null) {
                            throw err;
                        }
                        res.send('success')
                    })
                })
            })
        } else {
            // console.log(rows);       //[]
            res.send('学生信息错误，请重新填写')
        }
    })
})
router.post('/change_grade', (req, res) => {
    var number = req.body.number;
    var name = req.body.name;
    var sex = req.body.sex;
    var score = req.body.score;
    var exam = req.body.exam;
    var type = req.body.type;
    //1，先查看学生数据是否匹配；
    var sql = 'select * from member where number = ' + connection.escape(number) + '&&' + 'name =' + connection.escape(name) + '&&' + 'sex = ' + connection.escape(sex);
    connection.query(sql, (err, rows) => {
        if (err != null) {
            throw err;
        }
        if (rows[0] != undefined) {
            // console.log(rows)
            // console.log(rows[0].id)
            //2,在查看学生考试信息是否正确
            if (rows[0].identity == '学生') {
                var sql = "select * from v_student where user = " + connection.escape(rows[0].user)
                    + "&& exam = " + connection.escape(exam) + " && type = " + connection.escape(type);
                connection.query(sql, (err, rows) => {
                    if (err != null) {
                        throw err;
                    }
                    if (rows[0] != undefined) {
                        var sql = "UPDATE v_student SET score = ? WHERE user = ? && exam = ? && type = ?"
                        connection.query(sql, [score, rows[0].user, exam, type], (err, rows) => {
                            if(err != null ){
                                throw err;
                            }
                        res.send('success');
                        })
                    } else {
                        res.send('学生信息错误，没有该数据')
                    }
                })
            } else {
                res.send('学生信息错误，此人不是学生。');
            }
        } else {
            res.send('学生信息错误，请重新填写')
        }

    })
})
module.exports = router;
