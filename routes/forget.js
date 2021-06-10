var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');
var md5 = require('./bean/md5');
const sendEmail = require('./bean/sendEmail.js');

var User;
var Email;
var Password;
//   1
router.get('/', (req, res) => {
    res.render('forget1');
})
router.get('/check1', (req, res) => {
    User = req.query.ind;
    var sql = 'select * from member where user = ' + connection.escape(User);
    connection.query(sql, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            if (rows[0] != undefined) {
                res.send('0');
            } else {
                res.send('-1')
            }

        }
    })
})
//   2
router.get('/second', (req, res) => {
    if (User == undefined) {
        res.redirect('/forget');
    } else {
        res.render('forget2');
    }
})
router.get('/check2_email', (req, res) => {
    Email = req.query.data;
    var sql = 'select * from member where Email = ' + connection.escape(Email) + ' && user = ' + connection.escape(User);
    connection.query(sql, function (err, rows) {
        if (err) { throw err }
        // console.log(rows)
        if (rows[0] != undefined) {
            //随机生成6位数字
            let emailCode = (function captchaNumber() {
                let num = [];
                for (let i = 0; i < 6; i++) {
                    num[i] = parseInt(Math.random() * 10);
                }
                return num.join('');
            })()
            // console.log(emailCode);   生成的验证码导入到全局变量
            Password = emailCode;
            let email = {
                title: '我的的个人博客网站---邮箱验证码',
                body: `
        <h1>您好：</h1>
        <p style="font-size: 18px;color:#000;">
            您的验证码为：
            <span style="font-size: 16px;color:#f00;"> ${emailCode}， </span>
            您当前正在某某的个人博客网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
        </p>
        <p style="font-size: 1.5rem;color:#999;">60秒内有效</p>
        `
            }
            let emailCotent = {
                from: 'youngsudo@163.com', // 发件人地址
                to: Email, // 收件人地址，多个收件人可以使用逗号分隔
                subject: email.title, // 邮件标题
                html: email.body // 邮件内容
            };
            sendEmail.send(emailCotent)
            res.send('0');
        } else {
            res.send('-1')
        }
    })
})
router.get('/check2_sub', (req, res) => {
    // console.log(req.query) ;
    // console.log(Email,Password,User)
    if(Password === req.query.Pass && Email === req.query.Email){
        res.send('0');
    }else{
        res.send('-1');
    }
    
})
//   3
router.get('/third', (req, res) => {
    if (User == undefined) {
        res.redirect('/forget');
        return;
    }
    if (Email == undefined) {
        res.redirect('/forget/second');
        return;
    }
    res.render('forget3');
})
router.post('/check3', (req, res) => {
    // console.log(req.body.password)
    // console.log(User)
    var password = md5(req.body.password);
    var sql = 'UPDATE member SET password = ? WHERE user = ?'
    connection.query(sql, [password, User], function (err, rows) {
        if (err) {
            res.send('-1');
            return;
        }
        res.send('success');

    })
})
module.exports = router;