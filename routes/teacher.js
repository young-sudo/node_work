var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.all('/', (req, res, next) => {
   if (req.session.user != undefined && req.session.user.identity == '老师') {
      var sql = 'select islogout from member where user = ?'
      connection.query(sql, [req.session.user.user], function (err, results, fields) {
         if (err != null) {
            console.log(err);
            res.render("error", { text: err });
         } else {
            if (results[0].islogout == 'no') {
               next();
            } else {
               res.render("error", { text: '该账号已注销!!!' })
            }
         }

      });
   } else {
      res.render('error', { text: 'Please login first' });
   }
})

router.get('/', function (req, res, next) {
   connection.query('select * from v_student ', function (err, results, fields) {
      // 在user中添加一行数据
      req.session.user.title = req.session.user.name + '的全部学生';
      // console.log(req.session.user)
      if (err != null) {
         res.render('error', { text: err })
      }
      res.render("student_teacher", {
         list: results,
         key: req.session.user
      })
   })

});

router.post('/exam', function (req, res, next) {
   // console.log(req.body);
   // console.log(req.body.type);
   connection.query("select * from v_student where exam = ? ", [req.body.type], function (err, results, fields) {
      // console.log(results)
      if (err != null) {
         res.render("error", { text: err })
      }
      res.send(results);
   })
});

router.get('/grade', (req, res) => {
   res.render('grade');
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
         console.log(err);
         return;
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
               console.log(err);
               return;
            }
            course_id = rows[0].id;
            var sql_e = "select id from exam where type=" + connection.escape(exam);
            connection.query(sql_e, (err, rows) => {
               if (err != null) {
                  console.log(err);
                  return;
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
                     console.log(err);
                     return;
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
module.exports = router;