var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

var user;
var phonenumber;
//   1
router.get('/', (req, res) => {
    res.render('forget1');
})
router.get('/check1', (req, res) => {
    user = req.query.ind;
    var sql = 'select * from member where user = ' + connection.escape(user);
    connection.query(sql, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            // console.log(rows);
            // console.log(rows[0])
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
    if(user == undefined){
        res.redirect('/forget');
    }else{
        res.render('forget2');
    }   
})
router.get('/check2', (req, res) => {
    phonenumber = req.query.ind;
    var sql = 'select * from member where phonenumber = ' + connection.escape(phonenumber);
    connection.query(sql, function (err, rows) {
        if (err != null) {
            console.log(err);
            return;
        }
        if (rows[0] != undefined) {
            res.send('0');
        } else {
            res.send('-1')
        }
    })
})
//   3
router.get('/third', (req, res) => {
    console.log(user)
    if(user == undefined){
        res.redirect('/forget');
        return;
    }
    if(phonenumber == undefined){
        res.redirect('/forget/second');
        return;
    }  
    res.render('forget3');
})
router.post('/check3', (req, res) => {
    // console.log(req.body.password)
    // console.log(user)
    var sql = 'UPDATE member SET password = ? WHERE user = ?'
    connection.query(sql,[req.body.password,user],function(err,rows){
       if(err != null){
        res.send('-1');
        return;
       }
       res.send('success');
        
    })
})

module.exports = router;