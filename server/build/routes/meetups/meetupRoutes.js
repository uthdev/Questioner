

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _meetupController = require('../../controllers/meetupController');

const _meetupController2 = _interopRequireDefault(_meetupController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from 'express'
const meetupRoute = (0, _express2.default)();

meetupRoute.route('/').get(_meetupController2.default.allMeetup);

exports.default = meetupRoute;
