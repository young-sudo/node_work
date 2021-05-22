var express = require('express');
var router = express.Router();
var connection = require('./bean/mysql');

router.get('/:id', (req, res) => {
    var sql = 'delete from member where id =?';
    connection.query(sql,[req.params.id], function (err, results, fields) {
    // console.log(err)
    // console.log(results)
    // console.log(fields)
    });
    res.redirect('/magager');
})

module.exports = router;