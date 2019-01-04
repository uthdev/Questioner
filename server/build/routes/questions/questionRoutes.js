'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questionController = require('../../controllers/questionController');

var _questionController2 = _interopRequireDefault(_questionController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from 'express'
var questionRoute = (0, _express2.default)();

questionRoute.route('/').post(_questionController2.default.postQuestion);
questionRoute.route('/:id/upvote').patch(_questionController2.default.upvoteQuestion);
questionRoute.route('/:id/downvote').patch(_questionController2.default.downvoteQuestion);

exports.default = questionRoute;