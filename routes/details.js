var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');
var format = require('./bean/time');

router.all('/', (req, res, next) => {
    if (req.session.user != undefined && req.session.user != null) {
        next();
    } else {
        res.render('error', { text: 'Please login first' });
    }
})

router.get('/', (req, res) => {
    connection.query('select * from member where user =?', [req.session.user.user], function (err, results, fields) {
        if (err != null) {
            res.render('error', { text: err })
        } else {
            format(results);
            res.render("details", { value: results[0] });
        }

    })
})

router.post('/', (req, res) => {
    // console.log(req.body)
    var sql = "UPDATE member set number =?,name = ?,sex = ?,age =?,user =?,password =?,phonenumber =?,identity =? WHERE id = ?"
    connection.query(sql,[req.body.number, req.body.name, req.body.sex, req.body.age, req.body.user, req.body.password, req.body.phonenumber, req.body.identity, req.body.id], function (err, results, fields) {
        if(err != null) {
            res.render('error',{text:err})
        }else{
            var _identity = req.body.identity;
            if( _identity == "学生"){
                _identity = 'student';
            }else if(_identity == "老师"){
                _identity = 'teacher';
            }else if(_identity == '管理员'){
                _identity = 'magager';
            }else{
                res.render('error',{text:err})
            }
            res.redirect("/"+_identity);
        }
    })
})
module.exports = router;