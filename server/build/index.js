'use strict';

var express = require('express');
var app = express();

// set port for server to listen on
var Port = process.env.PORT || 5000;

// support parsing of application/json type post data
app.use(express.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded());

// Subscribe server to a particular port
app.listen(port, function () {
  return console.log('Server running on port ' + port + '...');
});