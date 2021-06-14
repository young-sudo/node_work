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

router.get('/', function (req, res) {
   connection.query('select studentNumber,name,sex,score,exam,type from v_score where name = ?', [req.session.user.name], function (err, rows) {
      req.session.user.title = req.session.user.name;
      if (err) {throw err};
      let results = rows;
      connection.query('select count(studentNumber) sum from v_score where name = ? limit 0,10',[req.session.user.name], function (err,rows) {
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

router.post('/exam', function (req, res) {
   connection.query("select name,sex,number,score,exam,type from v_student where user = ? && exam = ? ", [req.body.user, req.body.type], function (err, rows) {
      if (err) {throw err}
      res.send(rows);
   })
});
router.get('/fail', function (req, res) {
   connection.query("select name,sex,number,score,exam,type from v_student where user = ? && score <60", [req.query.user], function (err, rows) {
      if (err) {throw err}
      res.send(rows);
   })
});

module.exports = router;