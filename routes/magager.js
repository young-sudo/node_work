var express = require('express');
var router = express.Router();
var sd = require('silly-datetime');
var connection = require('./bean/mysql');
var format = require('./bean/time');


router.all('/', (req, res, next) => {
    if (req.session.user != undefined  && req.session.user.identity == '管理员') {
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
    var _inp = req.body.key;
    console.log(_inp)
    // var result ;
    connection.query('SELECT * FROM member where user like ?', ['%' + _inp + '%'], function (err, results, fields) {
        // console.log(err);
       format(results);
        // console.log(fields);
        if (results[0] == null) {
            res.send('null');
        } else {
            res.send(results);
        }
// console.log(2,results)
// result = results;
    })
    // console.log(1,result)
})

router.post('/change', (req, res) => {
    var c_value = req.body.value;
    var c_index = req.body.index;
    var c_user = req.body.user;
    connection.query('update member set  ' + c_index + ' = ? where user = ?', [c_value, c_user], function (err, results, fields) {
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

module.exports = router;