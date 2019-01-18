const responses = {};

responses.errorProcessing = (req, res) => {
  return res.status(500).json({
    status: 500,
    error: "Server error"
  })
}

responses.errorAccountExist = (req, res) => {
  return res.status(403).json({
    status: 409,
    error: "Account already exist"
  })
}

responses.nonExistingAccount = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Account not found'
  });
}

responses.incorrectPassword = (req, res) => {
  return res.status(400).json({
    status: 400,
    error: 'Invalid Password'
  });
}

responses.nonExistingMeetup = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Meetup not found',
  });
}

responses.nonExistingQuestion = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Question not found',
  });
}
export default responses;