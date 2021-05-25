var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');
var Use = require('./bean/session_login');
var session = require('express-session');

/* GET users listing. */
router.get('/', function (req, res, next) {
      res.render('login');
});

//登录
router.post('/', (req, res) => {
      connection.query('SELECT name,identity,islogout FROM member where user =? && password =? GROUP BY id', [req.body.user, req.body.password], function (err, results, fields) {
            if(err){
                  res.render('error', { text: 'watching' })
            }
            if (results[0] == null) {
                  res.render('error', { text: '密码错误' })
            } else {
                  if (results[0].islogout == 'yes') {
                        res.render("error", { text: '该用户已注销' })
                  } else {
                          //存入session
                          var use = new Use(results[0].name,req.body.user, req.body.password,results[0].identity);
                          req.session.user = use;
                       
                        if (results[0].identity == "学生") {
                              res.redirect('/student');
                        } else if (results[0].identity == '老师') {
                              res.redirect('/teacher');
                        } else if (results[0].identity == '管理员') {
                              res.redirect('/magager');
                        } else {
                              res.render('error', { text: 'error' })
                        }
                  }
            }

      });
});

//  先通过Ajax验证账号
router.get('/user',(req,res) =>{
      connection.query("select user from member where user=?", [req.query.key], function (err, results, fields) {
            if (results[0] != null) {
                 res.send('success')
            } else {
                res.send('没有该账号，请重新输入.')
            }
        })
})


module.exports = router;
