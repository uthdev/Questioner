'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetupRoutes = require('./routes/meetups/meetupRoutes');

var _meetupRoutes2 = _interopRequireDefault(_meetupRoutes);

var _questionRoutes = require('./routes/questions/questionRoutes');

var _questionRoutes2 = _interopRequireDefault(_questionRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// support parsing of application/json type post data
app.use(_express2.default.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(_express2.default.urlencoded());

app.get('/api/v1/', function (req, res) {
  res.status(200).json({ message: 'Welcome to the Questioner App' });
});
//meetup route
app.use('/api/v1/meetups', _meetupRoutes2.default);

//question route
app.use('/api/v1/questions', _questionRoutes2.default);

// set port for server to listen on
var port = process.env.PORT || 5000;

// Subscribe server to a particular port
app.listen(port, function () {
  return console.log('Server running on port ' + port + '...');
});

exports.default = app;