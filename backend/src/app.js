var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var signInRouter = require('./routes/signin')
var signUpRouter = require('./routes/signup')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// var debug = require('debug')('backend:server');
// var http = require('http');
var PORT = process.env.PORT || 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signin', signInRouter)
app.use('/signup', signUpRouter)
app.use('/users', usersRouter);


app.listen(PORT, () => {
	console.log(`listening at ${PORT}`)
})

module.exports = app;
