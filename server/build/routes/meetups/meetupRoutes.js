'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetupController = require('../../controllers/meetupController');

var _meetupController2 = _interopRequireDefault(_meetupController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from 'express'
var meetupRoute = (0, _express2.default)();

meetupRoute.route('/').get(_meetupController2.default.allMeetups);
meetupRoute.route('/upcoming').get(_meetupController2.default.upcomingMeetups);
meetupRoute.route('/:id').get(_meetupController2.default.getMeetup);
meetupRoute.route('/:id/rsvps').post(_meetupController2.default.rsvpMeetup);
meetupRoute.route('/').post(_meetupController2.default.createMeetup);

exports.default = meetupRoute;