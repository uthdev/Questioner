const responses = {};

responses.errorProcessing = (req, res) => res.status(500).json({
  status: 500,
  error: 'Server error',
});

responses.errorAccountExist = (req, res) => res.status(403).json({
  status: 409,
  error: 'Account already exist',
});

responses.nonExistingAccount = (req, res) => res.status(404).json({
  status: 404,
  error: 'Account not found',
});

responses.incorrectPassword = (req, res) => res.status(400).json({
  status: 400,
  error: 'Invalid Password',
});

responses.nonExistingMeetup = (req, res) => res.status(404).json({
  status: 404,
  error: 'Meetup not found',
});

responses.nonExistingQuestion = (req, res) => res.status(404).json({
  status: 404,
  error: 'Question not found',
});

responses.usernameExist = (req, res) => res.status(409).json({
  status: 409,
  error: 'Username already exist',
});
export default responses;
