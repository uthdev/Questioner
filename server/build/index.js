

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _meetupRoutes = require('./routes/meetups/meetupRoutes');

const _meetupRoutes2 = _interopRequireDefault(_meetupRoutes);

const _questionRoutes = require('./routes/questions/questionRoutes');

const _questionRoutes2 = _interopRequireDefault(_questionRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// support parsing of application/json type post data
app.use(_express2.default.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(_express2.default.urlencoded({ extended: true }));

app.get('/api/v1/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Questioner App' });
});
// meetup route
app.use('/api/v1/meetups', _meetupRoutes2.default);

// question route
app.use('/api/v1/questions', _questionRoutes2.default);

// set port for server to listen on
const port = process.env.PORT || 5000;

// Subscribe server to a particular port
app.listen(port, () => console.log(`Server running on port ${port}...`));

exports.default = app;
