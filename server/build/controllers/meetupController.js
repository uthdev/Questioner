

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

const _meetups = require('../data/meetups');

const _meetups2 = _interopRequireDefault(_meetups);

const _rsvps = require('../data/rsvps');

const _rsvps2 = _interopRequireDefault(_rsvps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const MeetupController = (function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'allMeetups',
    value: function allMeetups(req, res) {
      return _meetups2.default.length > 0 ? res.status(200).json({
        status: 200,
        data: _meetups2.default,
      }) : res.status(404).json({
        status: 404,
        data: [],
      });
    },
  }, {
    key: 'upcomingMeetups',
    value: function upcomingMeetups(req, res) {
      const presentDate = new Date();
      const upcomings = [];
      for (let i = 0; i < _meetups2.default.length; i++) {
        const date = _meetups2.default[i].happeningOn;
        if (Date.parse(date) > Date.parse(presentDate)) {
          upcomings.push(_meetups2.default[i]);
        }
      }
      return upcomings.length > 0 ? res.status(200).json({
        status: 200,
        data: upcomings,
      }) : res.status(404).json({
        status: 404,
        data: [],
      });
    },
  }, {
    key: 'getMeetup',
    value: function getMeetup(req, res) {
      const meetup = _meetups2.default.find(meet => meet.id === parseInt(req.params.id));
      if (!meetup) {
        return res.status(404).json({
          status: 404,
          error: 'The meetup with given ID was not found',
        });
      }

      const id = meetup.id;


      const topic = meetup.title;


      const location = meetup.location;


      const happeningOn = meetup.happeningOn;


      const tags = meetup.tags;

      res.status(200).json({
        status: 200,
        data: [{
          id,
          topic,
          location,
          happeningOn,
          tags,
        }],
      });
    },
  }, {
    key: 'createMeetup',
    value: function createMeetup(req, res) {
      // Validation
      const validateMeetup = function validateMeetup(meetup) {
        const schema = {
          title: _joi2.default.string().min(3).required(),
          location: _joi2.default.string().min(3).required(),
          happeningOn: _joi2.default.date().min(new Date()).iso().required(),
          tags: _joi2.default.array().items(_joi2.default.string()).required(),
        };
        return _joi2.default.validate(meetup, schema);
      };

      const _validateMeetup = validateMeetup(req.body);


      const error = _validateMeetup.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message,
        });
      }

      const newMeetup = {
        id: _meetups2.default.length + 1,
        title: req.body.title,
        location: req.body.location,
        happeningOn: req.body.happeningOn,
        tags: req.body.tags,
      };

      _meetups2.default.push(newMeetup);

      const id = newMeetup.id;


      const topic = newMeetup.title;


      const location = newMeetup.location;


      const happeningOn = newMeetup.happeningOn;


      const tags = newMeetup.tags;

      res.status(200).json({
        status: 200,
        data: [{
          id,
          topic,
          location,
          happeningOn,
          tags,
        }],
      });
    },
  }, {
    key: 'rsvpMeetup',
    value: function rsvpMeetup(req, res) {
      const lookedUpMeetup = _meetups2.default.find(meet => meet.id === parseInt(req.params.id));
      if (!lookedUpMeetup) {
        return res.status(404).json({
          status: 404,
          error: 'The meetup with given ID was not found',
        });
      }
      const topic = lookedUpMeetup.title;

      const validateRSVP = function validateRSVP(rsvp) {
        const schema = {
          meetup: _joi2.default.number().integer().positive().required(),
          user: _joi2.default.number().integer().positive().required(),
          response: _joi2.default.any().valid(['yes', 'no', 'maybe']).required(),
        };
        return _joi2.default.validate(rsvp, schema);
      };

      const _validateRSVP = validateRSVP(req.body);


      const error = _validateRSVP.error;

      if (error) {
        return res.status(422).json({
          status: 422,
          error: error.details[0].message,
        });
      }

      const rsvp = {
        id: parseInt(String(req.body.meetup) + String(req.body.user)),
        meetup: req.body.meetup,
        user: req.body.user,
        response: req.body.response,
      };
      const meetup = rsvp.meetup;


      const status = rsvp.response;

      _rsvps2.default.push(rsvp);
      res.status(200).json({
        status: 200,
        data: [{
          meetup,
          topic,
          status,
        }],
      });
    },
  }]);

  return MeetupController;
}());

exports.default = MeetupController;
