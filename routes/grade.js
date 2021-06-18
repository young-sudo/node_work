var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');
const sendEmail = require('./bean/sendEmail.js');

router.get('/', (req, res) => {
    var title = { title: '添加成绩' };
    res.render('grade', { key: title });
})

router.get('/change_grade', (req, res) => {
    var title = { title: '修改成绩' };
    res.render('grade', { key: title });
})

router.get('/name', (req, res) => {
    var sql = 'select * from member where name = ' + connection.escape(req.query.data);
    connection.query(sql, (err, rows) => {
        if (err) {throw err;};
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
    console.log(req.body);
    var number = req.body.number;
    var name = req.body.name;
    var sex = req.body.sex;
    var score = req.body.score;
    var exam = req.body.exam;
    var type = req.body.type;
    //1，先查看数据是否匹配；2，获取学生id；3，获取学生course_id；4，获取学生exam_id；5，组合，并输入数据库.
    var sql = 'select * from member where number = ' + connection.escape(number) + '&&' + 'name =' + connection.escape(name) + '&&' + 'sex = ' + connection.escape(sex);
    connection.query(sql, (err, rows) => {
        if (err) { throw err;}
        if (rows[0] != undefined) {
            var id = rows[0].id;
            var course_id;
            var exam_id;
            var sql_c = "select id from course where type=" + connection.escape(type);
            connection.query(sql_c, (err, rows) => {
                if (err) {throw err;}
                course_id = rows[0].id;
                var sql_e = "select id from exam where type=" + connection.escape(exam);
                connection.query(sql_e, (err, rows) => {
                    if (err) {throw err;}
                    exam_id = rows[0].id;
                    //score表中添加数据
                    score = parseInt(score);
                    var sql_s = "INSERT INTO score(member_id,score,course_id,exam_id) VALUES(?,?,?,?)";
                    connection.query(sql_s, [id, score, course_id, exam_id], (err, rows) => {
                        if (err) {throw err;}
                        res.send('success')
                    })
                })
            })
        } else {
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
        if (err) {throw err};
        if (rows[0] != undefined) {
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

router.get('/select',(req,res) => {
    let sql = 'select name,sex,score,exam,studentNumber number,type from v_score where teacherName = ? && score < 60';
    connection.query(sql,[req.session.user.name],(err,rows) => {
        if(err) {throw err};
        res.send(rows)
    })
})
router.get('/selectAll',(req,res) => {
    let sql = 'select name,sex,score,exam,studentNumber number,type from v_score ORDER BY score DESC limit 0,10';
    connection.query(sql,(err,rows) => {
        if(err) {throw err};
        let results = {};
        results.main = rows;
        connection.query('SELECT COUNT(*) sum FROM v_score',(err,rows) => {
            if(err) {throw err};
            results.page = parseInt(rows[0].sum/10)+1;
            res.send(results);
        })
    })
})
router.post('/paging', (req, res) => {
    let page = (req.body.page - 1) * 10;
    let exam = req.body.new_exam;
    
    let sql = 'select name,sex,score,exam,studentNumber number,type from v_score ORDER BY score DESC limit ?,10';
     connection.query(sql, [page], (err, rows) => {
        if (err) { throw err };
        res.send(rows);
    })
})

//student 
router.post('/errGrade',(req,res) => {
    connection.query('select * from v_stu_tea where studentName = ?',[req.body.name],(err,rows) =>{
        if(err){throw err};
        if(rows[0] != undefined) {
            let uname = rows[0].teacherName;
            let sql = 'select * from member where Email = ? && name = ?';
            connection.query(sql,[req.body.email,uname],(err,rows) => {
                if(err){throw err};
                if(rows[0] == undefined){
                    res.send('老师邮箱错误')
                }else{
                    connection.query('select Email from member where name = ?',[req.body.name],(err,rows) => {  //查自己的邮箱
                        if(err){throw err};
                        let studentEmail = rows[0].Email;
                        let email = {
                            title: '成绩错误，请求复查',
                            body: `
                    <h1>${uname}老师，您好：</h1>
                    <p style="font-size: 18px;color:#000;">
                        <span style="font-size: 16px;color:#f00;"> ${req.body.text} </span>  
                    </p>
                    `
                        }
                        let emailCotent = {
                            from: studentEmail, // 发件人地址
                            to: req.body.email, // 收件人地址，多个收件人可以使用逗号分隔
                            subject: email.title, // 邮件标题
                            html: email.body // 邮件内容
                        };
                        sendEmail.send(emailCotent);
                        res.redirect('http://localhost:3000/student');          // 回复的内容
                    })          
                }
            })
        }else{
            res.send('你还没有老师');          // 回复的内容
        }
    
    })        
})
module.exports = router;
