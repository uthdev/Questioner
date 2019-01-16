import db from '../config/index';
import authHelpers from '../helpers/authHelpers';
import responses from '../helpers/responses'

class UsersController {
  static signUp(req, res) {
    const { error } = authHelpers.validateUsers(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const hashedPassword = authHelpers.hashPassword(req.body.password);
    return db.query(`SELECT email FROM users WHERE email = '${req.body.email}'`, (err, result) =>{
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if(result.rowCount > 0) {
        return responses.errorAccountExist(req, res);
      }
      const { firstname, lastname, email, phonenumber, username } = req.body;
      const text = 'INSERT INTO users (firstname, lastname, email, phonenumber, password, username ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [firstname, lastname, email, phonenumber, hashedPassword, username];
      return db.query(text, values, (err, result) => {
        console.log(err)
        if(err) {
          return res.status(500).json({
            status: 500,
            error: err
          }) 
        } else {
          const user = result.rows[0];
          const token = authHelpers.generateToken(user);
          return res.status(201).json({
            status: 201, 
            data: [{
              token,
              user,
            }]
          });
        }  
      })
    })
  }

  static signIn(req, res) {
    const { error } = authHelpers.validateSignIn(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {email, password} = req.body;
    return db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) =>{
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if(result.rowCount > 0) { 
        const user = result.rows[0];
        if (authHelpers.comparePassword(password, user.password.trim())) {
          delete user.password;
          const token = authHelpers.generateToken(user);
          return res.status(200).json({
            status: 200, 
            data: [{
              token,
              user,
            }]
          });
        }  
        return responses.incorrectPassword(req, res);
      } else {
        return responses.nonExistingAccount(req, res);
      }
    })
  }
}

export default UsersController; 