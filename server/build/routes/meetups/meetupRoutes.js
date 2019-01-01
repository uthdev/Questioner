'use strict';

// import express from 'express'
var express = require('express');
var meetups = require('../../data/meetups');

var meetupRoute = express.Router();

// for parsing application/json
// meetupRoute.use(json());

// // for parsing application/x-ww-form-urlencoded
// meetupRoute.use(urlencoded());

meetupRoute.get('/', function (req, res, next) {
  res.status(200).json({
    status: 200,
    data: meetups
  });
});

module.exports = meetupRoute;