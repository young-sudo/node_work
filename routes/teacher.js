var express = require('express');
var router = express.Router();
var connection =require('./bean/mysql');

router.all('/', (req, res, next) => {
    if (req.session.user != undefined && req.session.user != null && req.session.user.identity == '老师') {
        next();
    } else {
        res.render('error', { text: 'Please login first' });
    }
 })
 
 router.get('/', function(req, res, next) {  
    connection.query('select * from v_student ',function (err, results, fields) {
      // 在user中添加一行数据
       req.session.user.title =  req.session.user.name + '的全部学生';
      // console.log(req.session.user)
       if(err != null){
          res.render('error',{text:err})
       }
       res.render("student_teacher",{
          list:results,
          key:req.session.user
       })
    }) 
     
 });

 router.post('/exam', function (req, res, next) {
   // console.log(req.body);
   // console.log(req.body.type);
   connection.query("select * from v_student where exam = ? ", [ req.body.type], function (err, results, fields) {
      // console.log(results)
      if (err != null) {
         res.render("error", { text: err })
      }
      res.send(results);
   })
});

module.exports = router;