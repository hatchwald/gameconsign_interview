var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const anagramRouter = require('./routes/anagram');
const plusRouter = require('./routes/plus');

var app = express();
app.set('view engine', 'pug')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/anagram', anagramRouter);
app.use('/plus', plusRouter);
require("./routes/config")(app)
module.exports = app;
