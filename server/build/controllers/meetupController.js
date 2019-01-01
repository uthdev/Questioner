

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _meetups = require('../data/meetups');

const _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const MeetupController = (function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: 'allMeetup',
    value: function allMeetup(req, res) {
      return _meetups2.default.length > 0 ? res.status(200).json({
        status: 200,
        data: _meetups2.default,
      }) : res.status(404).json({
        status: 404,
        message: 'No Meetup',
      });
    },
  }]);

  return MeetupController;
}());

exports.default = MeetupController;
