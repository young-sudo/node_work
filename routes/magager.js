var express = require('express');
var router = express.Router();
var sd = require('silly-datetime');
var connection = require('./bean/mysql');
var format = require('./bean/time');
var md5 = require('./bean/md5');
//  console.log(md5('123456'))

router.all('/', (req, res, next) => {
    if (req.session.user != undefined && req.session.user.identity == '管理员') {
        var sql = 'select islogout from member where user = ?'
        connection.query(sql, [req.session.user.user], function (err, results, fields) {
            if (err != null) {
                console.log(err);
                res.render("error", { text: err });
            } else {
                if (results[0].islogout == 'no') {
                    next();
                } else {
                    res.render("error", { text: '该账号已注销!!!' })
                }
            }

        });

    } else {
        res.render('error', { text: 'Please login first' });
    }
})

router.get('/', (req, res) => {
    var sql = 'select * from member ORDER BY identity desc';
    connection.query(sql, function (err, results, fields) {
        // 格式化时间
        format(results);
        res.render('magager', {
            list: results,
            key: req.session.user
        })
    })

})

router.post('/student', (req, res) => {
    connection.query("SELECT * FROM `member` where identity ='学生'", function (err, results, fields) {
        format(results);
        res.send(results);
    });

})
router.post('/teacher', (req, res) => {
    connection.query("SELECT * FROM `member` where identity ='老师'", function (err, results, fields) {
        format(results);
        res.send(results);
    });

})
router.post('/magager', (req, res) => {
    connection.query("SELECT * FROM `member` where identity ='管理员'", function (err, results, fields) {
        format(results);
        res.send(results);
    });

})

router.post('/search', (req, res) => {
    var search_inp = req.body.key;

    var sql = " SELECT * FROM member where user like " + connection.escape('%' + search_inp + '%') + " UNION SELECT * from member where name like " + connection.escape('%' + search_inp + '%')
        + " UNION SELECT * from member where number like " + connection.escape('%' + search_inp + '%') + " UNION SELECT * from member where sex like " + connection.escape('%' + search_inp + '%')
        + " UNION SELECT * from member where identity like " + connection.escape('%' + search_inp + '%')+ " UNION SELECT * from member where islogout like " + connection.escape('%' + search_inp + '%')
        ;

    connection.query(sql, function (err, rows) {
       if(err != null){
           throw err;
       }
        format(rows);
        if (rows[0] == null) {
            res.send('null');
        } else {
            res.send(rows);
        }
    })
})

router.post('/change', (req, res) => {
    var c_value = req.body.value;        //改变后的input值
    var c_index = req.body.index;           //改变的input的列名 id，number，user等
    var c_user = req.body.user;             //错误的原因：它是不会发生变化的 ; 解决方法：在前面改变它
    connection.query('update member set  ' + c_index + ' = ? where user = ?', [c_value, c_user], function (err, results) {
        if (err != null) {
            res.send('error')
        } else {
            res.send('success')
        }
    })
})
//
router.get('/islogout', (req, res) => {
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var logout_time = time;
    // console.log(req.session.user)
    connection.query("update member set islogout = 'yes',logout_time = ? where user = ?", [logout_time, req.session.user.user], function (err, results, fields) {
        res.render('error', { text: "注销账号成功，请重新登陆" });
    })
})

router.get('/logout', function(req,res){
  // 消除sesssion
     req.session.destroy();
     res.send('/login');
})

router.post('/password',(req,res) =>{
    // console.log(req.body);       //[Object: null prototype] { data: '111' }
    // console.log(req.body.data);
    res.send( md5(req.body.data))
})
module.exports = router;