import db from '../config/index';
import authHelpers from '../helpers/authHelpers';
import responses from '../helpers/responses'
import moment from 'moment';

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
    const queryString = `SELECT email FROM users WHERE email = '${req.body.email}'`
    return db.query(queryString, (err, result) =>{
      if (err) {
        console.log(err)
        return responses.errorProcessing(req, res);
      }
      if(result.rowCount > 0) {
        return responses.errorAccountExist(req, res);
      }
      return db.query(`SELECT username FROM users WHERE username = '${req.body.username}'`, (err, result) => {
        if(err) {
          return responses.errorProcessing(req, res);
         }
        if(result.rowCount > 0){
          return responses.usernameExist(req, res);
        }
        const { firstname, lastname, othername, email, phonenumber, username } = req.body;
        const text = 'INSERT INTO users (firstname, lastname, othername, email, phonenumber, password, username, registered ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [firstname, lastname,othername, email, phonenumber, hashedPassword, username, moment()];
        return db.query(text, values, (err, result) => {
          if(err) {
            console.log(err);
            return res.status(500).json({
              status: 500,
              error: "Server error"
            }) 
          } else {
            const user = result.rows[0];
            const { id, firstname, lastname, othername, email, phonenumber, username, registered, isAdmin} = user;
            const token = authHelpers.generateToken(user);
            return res.status(201).json({
              status: 201, 
              data: [{
                token,
                user,
              }]
            });
          }  
        });
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