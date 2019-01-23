import jwt from 'jsonwebtoken';

class AuthorizeUsers {
  static validateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        auth: false,
        message: 'No token provided.',
      });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      }

      return res.status(200).send(decoded);
    });
    return verify
  }
}

export default AuthorizeUsers;
