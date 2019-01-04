'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
describe('Test all question endpoint', function () {
  describe('/POST question', function () {
    it('should not post a question without title field', function (done) {
      var question = {
        user: 1,
        meetup: 3,
        title: '',
        "body of question": 'Who is stronger between Naruto and Sasuke?'
      };
      _chai2.default.request(_index2.default).post('/api/v1/questions').send(question).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(422);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error).to.be.equal('"title" is not allowed to be empty');
        done();
      });
    });

    it('should post a question', function (done) {
      var question = {
        user: 1,
        meetup: 3,
        title: 'naruto and sasuke',
        "body of question": 'Who is stronger between Naruto and Sasuke?'
      };
      _chai2.default.request(_index2.default).post('/api/v1/questions').send(question).end(function (err, res) {
        _chai.assert.isObject(res.body, 'is an object of the new question posted');
        (0, _chai.expect)(res.body.data[0]).to.have.property('user');
        (0, _chai.expect)(res.body.data[0]).to.have.property('meetup');
        (0, _chai.expect)(res.body.data[0]).to.have.property('title');
        (0, _chai.expect)(res.body.data[0]).to.have.property('body');
        done();
      });
    });
  });

  describe('Upvote a question', function () {
    it('should increase the vote property of a question by one', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/questions/3/upvote').end(function (err, res) {
        _chai.assert.isObject(res.body, 'is an object of the upvoted question');
        (0, _chai.expect)(res.body.data[0]).to.have.property('meetup');
        (0, _chai.expect)(res.body.data[0]).to.have.property('title');
        (0, _chai.expect)(res.body.data[0]).to.have.property('body');
        (0, _chai.expect)(res.body.data[0]).to.have.property('votes');
        (0, _chai.expect)(res.body.data[0].votes).to.be.equal(21);
        done();
      });
    });
  });

  describe('Downvote a question', function () {
    it('should decrease the vote property of a question by one', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/questions/2/downvote').end(function (err, res) {
        _chai.assert.isObject(res.body, 'is an object of the upvoted question');
        (0, _chai.expect)(res.body.data[0]).to.have.property('meetup');
        (0, _chai.expect)(res.body.data[0]).to.have.property('title');
        (0, _chai.expect)(res.body.data[0]).to.have.property('body');
        (0, _chai.expect)(res.body.data[0]).to.have.property('votes');
        (0, _chai.expect)(res.body.data[0].votes).to.be.equal(18);
        done();
      });
    });
  });
});