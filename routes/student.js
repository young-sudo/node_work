var express =require('express');
var router =express.Router();
var connection =require('./bean/mysql');


router.all('/', (req, res, next) => {
   if (req.session.user != undefined && req.session.user != null && req.session.user.identity == '学生') {
       next();
   } else {
       res.render('error', { text: 'Please login first' });
   }
})

router.get('/', function(req, res, next) {  
   connection.query('select * from v_student where name = ?',[req.session.user.name],function (err, results, fields) {
      req.session.user.text =  req.session.user.name;
      if(err != null){
         res.render('error',{text:err})
      }
      res.render("student_teacher",{
         list:results,
         key:req.session.user
      })
   }) 
    
});

module.exports =router;