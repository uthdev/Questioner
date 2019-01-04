'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _meetups = require('../data/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

var _rsvps = require('../data/rsvps');

var _rsvps2 = _interopRequireDefault(_rsvps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupController = function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'allMeetups',
    value: function allMeetups(req, res) {
      return _meetups2.default.length > 0 ? res.status(200).json({
        status: 200,
        data: _meetups2.default
      }) : res.status(404).json({
        status: 404,
        data: []
      });
    }
  }, {
    key: 'upcomingMeetups',
    value: function upcomingMeetups(req, res) {
      var presentDate = new Date();
      var upcomings = [];
      for (var i = 0; i < _meetups2.default.length; i++) {
        var date = _meetups2.default[i].happeningOn;
        if (Date.parse(date) > Date.parse(presentDate)) {
          upcomings.push(_meetups2.default[i]);
        }
      }
      return upcomings.length > 0 ? res.status(200).json({
        status: 200,
        data: upcomings
      }) : res.status(404).json({
        status: 404,
        data: []
      });
    }
  }, {
    key: 'getMeetup',
    value: function getMeetup(req, res) {
      var meetup = _meetups2.default.find(function (meet) {
        return meet.id === parseInt(req.params.id);
      });
      if (!meetup) return res.status(404).json({
        status: 404,
        error: "The meetup with given ID was not found"
      });

      var id = meetup.id,
          topic = meetup.title,
          location = meetup.location,
          happeningOn = meetup.happeningOn,
          tags = meetup.tags;

      res.status(200).json({
        status: 200,
        data: [{
          id: id,
          topic: topic,
          location: location,
          happeningOn: happeningOn,
          tags: tags
        }]
      });
    }
  }, {
    key: 'createMeetup',
    value: function createMeetup(req, res) {
      //Validation 
      var validateMeetup = function validateMeetup(meetup) {
        var schema = {
          title: _joi2.default.string().min(3).required(),
          location: _joi2.default.string().min(3).required(),
          happeningOn: _joi2.default.date().min(new Date()).iso().required(),
          tags: _joi2.default.array().items(_joi2.default.string()).required()
        };
        return _joi2.default.validate(meetup, schema);
      };

      var _validateMeetup = validateMeetup(req.body),
          error = _validateMeetup.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message
        });
      }

      var newMeetup = {
        id: _meetups2.default.length + 1,
        title: req.body.title,
        location: req.body.location,
        happeningOn: req.body.happeningOn,
        tags: req.body.tags
      };

      _meetups2.default.push(newMeetup);

      var id = newMeetup.id,
          topic = newMeetup.title,
          location = newMeetup.location,
          happeningOn = newMeetup.happeningOn,
          tags = newMeetup.tags;

      res.status(200).json({
        status: 200,
        data: [{
          id: id,
          topic: topic,
          location: location,
          happeningOn: happeningOn,
          tags: tags
        }]
      });
    }
  }, {
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      var lookedUpMeetup = _meetups2.default.find(function (meet) {
        return meet.id === parseInt(req.params.id);
      });
      if (!lookedUpMeetup) return res.status(404).json({
        status: 404,
        error: "The meetup with given ID was not found"
      });
      var topic = lookedUpMeetup.title;

      var validateRSVP = function validateRSVP(rsvp) {
        var schema = {
          meetup: _joi2.default.number().integer().positive().required(),
          user: _joi2.default.number().integer().positive().required(),
          response: _joi2.default.any().valid(['yes', 'no', 'maybe']).required()
        };
        return _joi2.default.validate(rsvp, schema);
      };

      var _validateRSVP = validateRSVP(req.body),
          error = _validateRSVP.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message
        });
      }

      var rsvp = {
        id: parseInt(String(req.body.meetup) + String(req.body.user)),
        meetup: req.body.meetup,
        user: req.body.user,
        response: req.body.response
      };
      var meetup = rsvp.meetup,
          status = rsvp.response;

      _rsvps2.default.push(rsvp);
      res.status(200).json({
        status: 200,
        data: [{
          meetup: meetup,
          topic: topic,
          status: status
        }]
      });
    }
  }]);

  return MeetupController;
}();

exports.default = MeetupController;