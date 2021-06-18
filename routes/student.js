var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.all('/', (req, res, next) => {
   if (req.session.user != undefined) {
     next();
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
            list :results,
            key: req.session.user,
            page:page
         })
      })
   })

});

router.post('/exam', function (req, res) {
   connection.query("select name,sex,number,score,exam,type from v_student where name = ? && exam = ? ", [req.body.name, req.body.type], function (err, rows) {
      if (err) {throw err}
      res.send(rows);
   })
});
router.get('/fail', function (req, res) {
   connection.query("select name,sex,number,score,exam,type from v_student where name = ? && score <60", [req.query.name], function (err, rows) {
      if (err) {throw err}
      res.send(rows);
   })
});

router.get('/myteacher', function (req, res) {
   connection.query("SELECT teacherUser teacher from v_stu_tea WHERE studentName = ?",[req.query.name], function (err, rows) {
      if (err) {throw err}
      var results ={};
     if(rows[0] != undefined){
      results.name = rows[0].teacher;
      connection.query('select Email from member where name = ?',[results.name],(err,rows) => {
         if(err){throw err};
         results.email = rows[0].Email;
         res.send(results);   //{ name: '李白', email: 'youngsudo@163.com' }
      })
     }else{
      res.send('-1')
     }

   })
});
router.get('/chose',(req,res)=>{
   let name = req.query.data;
   connection.query('select  studentNumber,teacherName name from v_stu_tea where studentName = ?',[name],(err,rows) =>{
      if(err) {throw err};
      let results = {};
      results.myteacher = rows;
      if( rows[0]!= undefined){
         connection.query('select number,name,islogout from member where identity = "老师"',(err,rows) =>{
            if(err){throw err};
            results.teacher = rows;
            res.send(results);   
         })
      }else{
         res.send('-1');
      }
   })
})
router.get('/chose/change',(req,res) => {
   let tea_name = req.query.data;
   let ch ={};
   var p1 = new Promise((resolve, reject) => {             //该学生
      connection.query('select id from member where user = ?',[req.session.user.user],(err,rows) => {
         if(err){throw err};
         resolve(rows)
      })
   });
   var p2 = new Promise((resolve, reject) => {                 // 鼠标点击的老师
      connection.query('select id from member where name = ?',[tea_name],(err,rows) => {
         if(err){throw err};
         resolve(rows);
      })
   });
   // var p3 = new Promise((resolve, reject) => {    
   //    let sql ='select * from tab_stu_tea where student_id = ?';
   //    // console.log(ch)         //{}
   //    connection.query(sql,[ch.student_id],(err,rows) => {
   //       if(err){throw err};
   //       // console.log(ch)      //{ student_id: 16, teacher_id: 30 }
   //       console.log(rows)
   //    })
   // });

    p1
        .then(function (data) {
          ch.student_id = data[0].id;
            return p2;
        })
        .then(function (data) {
         ch.teacher_id = data[0].id;
         // console.log(ch);  //{ student_id: 16, teacher_id: 30 }
         // return p3;
        })
   
})

module.exports = router;