var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var magagerRouter =require('./routes/magager');
var deleteRouter =require('./routes/delete');
var studentRouter =require('./routes/student');
var teacherRouter =require('./routes/teacher');
var detailsRouter =require('./routes/details');
var forgetRouter =require('./routes/forget');
var gradeRouter =require('./routes/grade');
var uploadRouter =require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('text'));
app.use(session({
  secret: "text",
  cookie: { maxAge: 6000000 },
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/magager',magagerRouter);
app.use('/delete',deleteRouter);
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
// 详情
app.use('/details',detailsRouter);
// 忘记密码
app.use('/forget',forgetRouter);
// 成绩
app.use('/grade',gradeRouter);
//图片上传
app.use('/upload',uploadRouter)

module.exports = app;
