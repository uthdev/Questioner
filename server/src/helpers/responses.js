const responses = {};

responses.errorProcessing = (req, res) => {
  return res.status(500).json({
    status: 500,
    error: "Server error"
  })
}

responses.errorAccountExist = (req, res) => {
  return res.status(403).json({
    status: 403,
    error: "Account already exist"
  })
}

responses.nonExistingAccount = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Could not find any user matching your request'
  });
}

responses.incorrectPassword = (req, res) => {
  return res.status(400).json({
    status: 400,
    error: 'Incorrect Password'
  });
}

responses.nonExistingMeetup = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'The meetup with given ID was not found',
  });
}

responses.nonExistingQuestion = (req, res) => {
  return res.status(404).json({
    status: 404,
    error: 'Invalid ID',
  });
}
export default responses;