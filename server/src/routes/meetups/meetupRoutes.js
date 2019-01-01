// import express from 'express'
const express = require('express');
const meetups = require('../../data/meetups');

const meetupRoute = express.Router();

// for parsing application/json
// meetupRoute.use(json());

// // for parsing application/x-ww-form-urlencoded
// meetupRoute.use(urlencoded());

meetupRoute.get('/', (req, res,next) => {
  res.status(200).json({
    status: 200,
    data: meetups
  });
}); 

module.exports =  meetupRoute;