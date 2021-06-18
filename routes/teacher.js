var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.all('/', (req, res, next) => {
   if (req.session.user != undefined && req.session.user.identity == '老师') {
      var sql = 'select islogout from member where user = ?'
      connection.query(sql, [req.session.user.user], function (err, results, fields) {
         if (err) {
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
   let sql ='SELECT * FROM v_score WHERE teacherName = ? limit 0,10'
   connection.query(sql,[req.session.user.name], function (err,rows) {
      // 在user中添加一行数据
      req.session.user.title = req.session.user.name + '的所有学生';
      if (err) { throw err};
      let results = rows;
      connection.query('select count(studentNumber) sum from v_score where teacherName = ? limit 0,10',[req.session.user.name], function (err,rows) {
         if(err){throw err};
         let page =parseInt(rows[0].sum/10) + 1;
         res.render("student_teacher", {
            list: results,
            key: req.session.user,
            page:page
         })
      })
   })

});

router.post('/exam', function (req, res, next) {
   // console.log(req.body);
   // console.log(req.body.type);
   let sql = "select name,sex,score,exam,studentNumber number,type from v_score where exam = ? && teacherName = ? limit 0,10"
   connection.query(sql, [req.body.type,req.session.user.name], function (err, rows) {
      // console.log(results)
      if (err) {throw err};
      res.send(rows);
   })
});
router.get('/search',(req,res) => {
   let sql_index = req.query.data;
   let sql = "select * from v_student where name like "+ connection.escape('%'+ sql_index +'%')
   + " UNION SELECT * from v_student where number like "+ connection.escape('%'+ sql_index +'%')
   + " UNION SELECT * from v_student where sex like "+ connection.escape('%'+ sql_index +'%')
   + " UNION SELECT * from v_student where type like "+ connection.escape('%'+ sql_index +'%')
   + " UNION SELECT * from v_student where score like " + connection.escape('%'+ sql_index +'%')
   + " UNION SELECT * from v_student where exam like "+ connection.escape('%'+ sql_index +'%')
   ;
   connection.query(sql,(err,rows) => {
     if(err){throw err};
     res.send(rows)
   })
})
module.exports = router;