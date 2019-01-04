

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

const _questions = require('../data/questions');

const _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const QuestionController = (function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: 'postQuestion',
    value: function postQuestion(req, res) {
      // validation
      const validateQuestion = function validateQuestion(question) {
        const schema = {
          user: _joi2.default.number().integer().positive().required(),
          meetup: _joi2.default.number().integer().positive().required(),
          title: _joi2.default.string().min(3).required(),
          'body of question': _joi2.default.string().min(5).required(),
        };
        return _joi2.default.validate(question, schema);
      };

      const _validateQuestion = validateQuestion(req.body);


      const error = _validateQuestion.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message,
        });
      }
      const newQuestion = {
        id: _questions2.default.length + 1,
        createdOn: new Date(),
        createdBy: req.body.user,
        meetup: req.body.meetup,
        title: req.body.title,
        body: req.body['body of question'],
        votes: 0,
      };
      _questions2.default.push(newQuestion);
      const user = newQuestion.createdBy;


      const meetup = newQuestion.meetup;


      const title = newQuestion.title;


      const body = newQuestion.body;

      res.status(200).json({
        status: 200,
        data: [{
          user,
          meetup,
          title,
          body,
        }],
      });
    },
  }, {
    key: 'upvoteQuestion',
    value: function upvoteQuestion(req, res) {
      // get a specific question
      const lookedUpQuestion = _questions2.default.find(question => question.id === parseInt(req.params.id));
      if (!lookedUpQuestion) {
        return res.status(404).json({
          status: 404,
          error: 'No question matching the given ID',
        });
      }

      lookedUpQuestion.votes += 1;
      const meetup = lookedUpQuestion.meetup;


      const title = lookedUpQuestion.title;


      const body = lookedUpQuestion.body;


      const votes = lookedUpQuestion.votes;

      res.status(200).json({
        status: 200,
        data: [{
          meetup,
          title,
          body,
          votes,
        }],
      });
    },
  }, {
    key: 'downvoteQuestion',
    value: function downvoteQuestion(req, res) {
      const lookedUpQuestion = _questions2.default.find(question => question.id === parseInt(req.params.id));
      if (!lookedUpQuestion) {
        return res.status(404).json({
          status: 404,
          error: 'No question matching the given ID',
        });
      }

      lookedUpQuestion.votes -= 1;
      const meetup = lookedUpQuestion.meetup;


      const title = lookedUpQuestion.title;


      const body = lookedUpQuestion.body;


      const votes = lookedUpQuestion.votes;

      res.status(200).json({
        status: 200,
        data: [{
          meetup,
          title,
          body,
          votes,
        }],
      });
    },
  }]);

  return QuestionController;
}());

exports.default = QuestionController;
