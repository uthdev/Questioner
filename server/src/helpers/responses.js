const responses = {};

responses.errorProcessing = (req, res) => {
  return res.status(451).json({
    status: 451,
    error: "error processing data"
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
    error: 'Could not find any user matching your request'
  })
}

responses.incorrectPassword = (req, res) => {
  return res.status(400).json({
    status: 400,
    error: 'Incorrect Password'
  })
}
export default responses;
export default responses;
