var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var connection = require('./bean/mysql');
var sd = require('silly-datetime');
var User = require('./bean/user');

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
    var user = new User(req.body.number, req.body.name, req.body.sex, req.body.age, req.body.user,
        req.body.password, req.body.phonenumber, req.body.identity, time);

    var sql = "INSERT INTO member(number,name,sex,age,user,password,phonenumber,identity,create_time) VALUES(?,?,?,?,?,?,?,?,?)"
    connection.query(sql,
        [user.number, user.name, user.sex, user.age, user.user, user.password, user.phonenumber, user.identity, user.create_time], function (err, results, fields) {
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
});

router.post('/number', (req, res) => {
    // console.log(req.body.key);
    connection.query("select * from member where number=?", [req.body.key], function (err, results, fields) {
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The number already exists. Please reenter it .')
        }
    })
})

router.post('/name', (req, res) => {
    connection.query("select * from member where name=?", [req.body.key], function (err, results, fields) {
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The name already exists. Make sure you use that name ?')
        }
    })
})

router.post('/user', (req, res) => {
    connection.query("select * from member where user=?", [req.body.key], function (err, results, fields) {
        if (results[0] == null) {
            res.send('success')
        } else {
            res.send('The username already exists. Please reenter it !')
        }
    })
})

module.exports = router;