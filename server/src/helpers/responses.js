const responses = {};

responses.errorProcessing = (req, res) => {
  return res.status(500).json({
    status: 500,
    error: "error processing data"
  })
}

responses.errorAccountExist = (req, res) => {
  return res.status(403).json({
    status: 403,
    error: "Account already exist"
  })
}

export default responses;