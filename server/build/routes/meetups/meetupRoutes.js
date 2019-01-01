

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _meetups = require('../../data/meetups');

const _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from 'express'
const meetupRoute = _express2.default.Router();

// for parsing application/json
// meetupRoute.use(json());

// // for parsing application/x-ww-form-urlencoded
// meetupRoute.use(urlencoded());

meetupRoute.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    data: _meetups2.default,
  });
});

exports.default = meetupRoute;
