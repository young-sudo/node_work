var mysql =require('mysql');

// 创建连接
var DB ={
    host: '127.0.0.1',
    port:'3306',
    user: 'root',
    password: '123456',
    database: 'work'
}

var connection = mysql.createConnection({
   host:DB.host,
   post:DB.post,
   user:DB.user,
   password:DB.password,
   database:DB.database,
});

//连接MySQL（可不写）
connection.connect(function (err) {
    //连接错误的处理
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('success! connected as id ' + connection.threadId);
});


//断开，关闭MySQL 执行完sql 语句就断开
// connection.end();

module.exports = connection;
