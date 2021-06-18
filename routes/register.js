var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var connection = require('./bean/mysql');
var sd = require('silly-datetime');
var User = require('./bean/user');
var md5 = require('./bean/md5');
const sendEmail = require('./bean/sendEmail.js');

fs.readFile(path.join(__dirname, 'bean/input.json'), { encoding: 'utf-8' }, function (err, d) {
    inputVal = JSON.parse(d);
});

router.get('/', (req, res) => {
    res.render('register', {
        key: inputVal
    });
});
router.post('/', (req, res) => {
    //获取当前时间 并格式化
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    user = new User(req.body.number, req.body.name, req.body.sex, req.body.age, req.body.user,
        req.body.password, req.body.Email, req.body.identity, time);
    //md5加密密码
    user.password = md5(user.password);
    var sql = "INSERT INTO member(number,name,sex,age,user,password,Email,identity,create_time) VALUES(?,?,?,?,?,?,?,?,?)"
    connection.query(sql,
        [user.number, user.name, user.sex, user.age, user.user, user.password, user.Email, user.identity, user.create_time], function (err, results, fields) {
            if (err) {throw err};
            if (req.session.user != undefined) {
                // console.log(req.session.user)          //session
                if (req.session.user.identity == '学生') {
                    var url = '/student';
                } else if (req.session.user.identity == '老师') {
                    var url = '/teacher';
                } else {
                    var url = '/magager';
                }
                res.send(url);
            } else {
                res.send('/login');
            }

        });
        //当身份是学生时，直接查询刚刚插入成功的数据,然后将数据插入到tab_stu_tea 表中。默认老师为 5号李白
        if( user.identity == '学生'){
            connection.query('select id from member where user = ?',[user.user],(err,rows) => {
                if(err){throw err};
                let stu_id = rows[0].id;
                let sql = 'INSERT INTO tab_stu_tea VALUES (null,?,?)';
                connection.query(sql,[stu_id,5],(err,rows) => {
                    if(err){throw err};
                })
            }) 
        }    
});

router.post('/number', (req, res) => {
    // console.log(req.body.key);
    connection.query("select * from member where number=?", [req.body.key], function (err, results, fields) {
        if (err != null) {
            throw err;
        }
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The number already exists. Please reenter it .')
        }
    })
})

router.post('/name', (req, res) => {
    connection.query("select * from member where name=?", [req.body.key], function (err, results, fields) {
        if (err != null) {
            throw err;
        }
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The name already exists. Make sure you use that name ?')
        }
    })
})

router.post('/user', (req, res) => {
    connection.query("select * from member where user=?", [req.body.key], function (err, results, fields) {
        if (err != null) {
            throw err;
        }
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The username already exists. Please reenter it !')
        }
    })
})
//验证码
router.get('/auth', (req, res) => {
     //随机生成6位数字
     let emailCode = (function captchaNumber() {
        let num = [];
        for (let i = 0; i < 6; i++) {
            num[i] = parseInt(Math.random() * 10);
        }
        return num.join('');
    })();
    var pass = emailCode;
    let email = {
        title: '我的的个人博客网站---邮箱验证码',
        body: `
            <h1>您好：</h1>
            <p style="font-size: 18px;color:#000;">
                您的验证码为：
                <span style="font-size: 16px;color:#f00;"> ${pass}， </span>
                您当前正在某某的个人博客网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
            </p>
            <p style="font-size: 1.5rem;color:#999;">1小时内有效</p>
            `
        }
    let emailCotent = {
        from: 'youngsudo@163.com', // 发件人地址
        to:req.query.email, // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.body // 邮件内容
    };
    sendEmail.send(emailCotent);
    res.send(pass);
})
module.exports = router;