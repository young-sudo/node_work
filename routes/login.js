var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');
var Use = require('./bean/session_login');
var session = require('express-session');
var md5=require('./bean/md5');

/* GET users listing. */
router.get('/', function (req, res, next) {
      res.render('login');
});

//登录
var loginCount = 1;      // 登陆次数在五次以内
router.post('/',(req,res,next) =>{
      if(loginCount <= 5){
            console.log(loginCount);
            next();
      }else{
            setTimeout(() => {
                  loginCount = 0;
            }, 5*60*1000);
            res.render('error',{text:'请在5分钟后再尝试'});
      }
})
router.post('/', (req, res) => {
      var password = md5(req.body.password);
      connection.query('SELECT name,identity,islogout FROM member where user =? && password =?', [req.body.user, password], function (err, results, fields) {
            if(err){
                  res.render('error', { text: 'watching' })
            }
            if (results[0] == null) {
                  loginCount = loginCount + 1;       // 登陆次数+1
                  res.render('error', { text: '密码错误' })
            } else {
                  if (results[0].islogout == 'yes') {
                        res.render("error", { text: '该用户已注销' })
                  } else {
                          //存入session
                          var use = new Use(results[0].name,req.body.user,password,results[0].identity);
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
