var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.all('/', (req, res, next) => {
   if (req.session.user != undefined && req.session.user.identity == '学生') {
      var sql ='select islogout from member where user = ?'
        connection.query(sql,[req.session.user.user], function (err, results, fields) {
            if(err != null){
                console.log(err);
                res.render("error",{text:err});
            }else{
                if(results[0].islogout == 'no'){
                    next();
                }else{
                    res.render("error",{text:'该账号已注销!!!'})
                }
            }
            
        });
   }else {
      res.render('error', { text: 'Please login first' });
   }
})

router.get('/', function (req, res, next) {
   connection.query('select * from v_student where name = ?', [req.session.user.name], function (err, results, fields) {
      req.session.user.title = req.session.user.name;
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
   connection.query("select * from v_student where user = ? && exam = ? ", [req.body.user, req.body.type], function (err, results, fields) {
      // console.log(results)
      if (err != null) {
         res.render("error", { text: err })
      }
      res.send(results);
   })
});


module.exports = router;