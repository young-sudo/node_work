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
   let sql ='SELECT t.studentNumber,s.name,s.sex,s.score,s.exam,s.type,t.teacherNumber,t.teacherName from v_student s INNER JOIN v_stu_tea t on s.user = t.studentUser where t.teacherName = ?'
   connection.query(sql,[req.session.user.name], function (err,rows) {
      // 在user中添加一行数据
      req.session.user.title = req.session.user.name + '的所有学生';
      //  console.log(req.session.user)
      if (err) { throw err};
      // console.log(rows)
      res.render("student_teacher", {
         list: rows,
         key: req.session.user
      })
   })

});

router.post('/exam', function (req, res, next) {
   // console.log(req.body);
   // console.log(req.body.type);
   let sql = "select name,sex,score,exam,studentNumber number,type from v_score where exam = ? && teacherName = ?"
   connection.query(sql, [req.body.type,req.session.user.name], function (err, rows) {
      // console.log(results)
      if (err) {throw err};
      res.send(rows);
   })
});
router.get('/search',(req,res) => {
   var sql = "select * from v_student where name = "+ connection.escape(req.query.data)
   + " UNION SELECT * from v_student where number = "+ connection.escape(req.query.data)
   + " UNION SELECT * from v_student where sex = "+ connection.escape(req.query.data)
   + " UNION SELECT * from v_student where type = "+ connection.escape(req.query.data)
   + " UNION SELECT * from v_student where score = " + connection.escape(req.query.data)
   + " UNION SELECT * from v_student where exam = "+ connection.escape(req.query.data)
   ;
   connection.query(sql,(err,rows) => {
     if(err != null){throw err};
     res.send(rows)
   })
})
module.exports = router;