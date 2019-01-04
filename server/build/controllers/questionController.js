'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _questions = require('../data/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: 'postQuestion',
    value: function postQuestion(req, res) {
      //validation
      var validateQuestion = function validateQuestion(question) {
        var schema = {
          user: _joi2.default.number().integer().positive().required(),
          meetup: _joi2.default.number().integer().positive().required(),
          title: _joi2.default.string().min(3).required(),
          'body of question': _joi2.default.string().min(5).required()
        };
        return _joi2.default.validate(question, schema);
      };

      var _validateQuestion = validateQuestion(req.body),
          error = _validateQuestion.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message
        });
      }
      var newQuestion = {
        id: _questions2.default.length + 1,
        createdOn: new Date(),
        createdBy: req.body.user,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body['body of question'],
        votes: 0
      };
      _questions2.default.push(newQuestion);
      var user = newQuestion.createdBy,
          meetup = newQuestion.meetup,
          title = newQuestion.title,
          body = newQuestion.body;

      res.status(200).json({
        status: 200,
        data: [{
          user: user,
          meetup: meetup,
          title: title,
          body: body
        }]
      });
    }
  }, {
    key: 'upvoteQuestion',
    value: function upvoteQuestion(req, res) {
      //get a specific question
      var lookedUpQuestion = _questions2.default.find(function (question) {
        return question.id === parseInt(req.params.id);
      });
      if (!lookedUpQuestion) return res.status(404).json({
        status: 404,
        error: 'No question matching the given ID'
      });

      lookedUpQuestion.votes += 1;
      var meetup = lookedUpQuestion.meetup,
          title = lookedUpQuestion.title,
          body = lookedUpQuestion.body,
          votes = lookedUpQuestion.votes;

      res.status(200).json({
        status: 200,
        data: [{
          meetup: meetup,
          title: title,
          body: body,
          votes: votes
        }]
      });
    }
  }, {
    key: 'downvoteQuestion',
    value: function downvoteQuestion(req, res) {
      var lookedUpQuestion = _questions2.default.find(function (question) {
        return question.id === parseInt(req.params.id);
      });
      if (!lookedUpQuestion) return res.status(404).json({
        status: 404,
        error: 'No question matching the given ID'
      });

      lookedUpQuestion.votes -= 1;
      var meetup = lookedUpQuestion.meetup,
          title = lookedUpQuestion.title,
          body = lookedUpQuestion.body,
          votes = lookedUpQuestion.votes;

      res.status(200).json({
        status: 200,
        data: [{
          meetup: meetup,
          title: title,
          body: body,
          votes: votes
        }]
      });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;