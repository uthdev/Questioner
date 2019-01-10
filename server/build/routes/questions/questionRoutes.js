

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _questionController = require('../../controllers/questionController');

const _questionController2 = _interopRequireDefault(_questionController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import express from 'express'
const questionRoute = (0, _express2.default)();

questionRoute.route('/').post(_questionController2.default.postQuestion);
questionRoute.route('/:id/upvote').patch(_questionController2.default.upvoteQuestion);
questionRoute.route('/:id/downvote').patch(_questionController2.default.downvoteQuestion);

exports.default = questionRoute;
