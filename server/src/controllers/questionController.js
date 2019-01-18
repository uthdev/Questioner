import moment from 'moment';
import helpers from '../helpers/helpers';
import responses from '../helpers/responses'
import db from '../config/index';

class QuestionController {
  static postQuestion(req, res) {
    const { error } = helpers.validateQuestion(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {
      createdBy, meetup, title, body,
    } = req.body;
    const createdOn = moment();
    const queryString = 'INSERT INTO questions (createdBy, createdOn, meetup, title, body) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [createdBy, createdOn, meetup, title, body];
    return db.query(queryString, values, (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if(result.rowCount > 0) { 
        const question = result.rows[0];
        const {
          createdby : user, meetup, title, body,
        } = question;
        return res.status(201).json({
          status: 201,
          data: [{
            user,
            meetup,
            title,
            body,
          }],
        });
      }
    });
  }

  static upvoteQuestion(req, res) {
    const { error } = helpers.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const { id } = req.params;
    const queryString = 'SELECT votes FROM questions WHERE id = $1';
    return db.query(queryString, [id], (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      } 
      if (result.rowCount <= 0) {
       return responses.nonExistingQuestion(req, res);
      }
      if (result.rowCount > 0) {
        const queryString = 'UPDATE questions SET votes = votes + 1 WHERE id = $1 returning *';
        const params = [req.params.id];
        return db.query(queryString, params, (err, result) => {
          if (err) {
            return responses.errorProcessing(req, res);
          } 
          if (result.rowCount > 0) {
            const lookedUpQuestion = result.rows[0];
            const {
              meetup, title, body, votes,
            } = lookedUpQuestion;
            return res.status(200).json({
              status: 200,
              data: [{
                meetup,
                title,
                body,
                votes,
              }],
            })
          }
        }) 
      }
    }) 
  }

  static downvoteQuestion(req, res) {
    const { error } = helpers.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const { id } = req.params;
    const queryString = 'SELECT votes FROM questions WHERE id = $1';
    return db.query(queryString, [id], (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      } 
      if (result.rowCount <= 0) {
        return responses.nonExistingQuestion(req, res);
      }
      if (result.rowCount > 0) {
        const queryString = 'UPDATE questions SET votes = votes - 1 WHERE id = $1 returning *';
        const params = [req.params.id];
        return db.query(queryString, params, (err, result) => {
          if (err) {
            return responses.errorProcessing(req, res);
          } 
          if (result.rowCount > 0) {
            const lookedUpQuestion = result.rows[0];
            const {
              meetup, title, body, votes,
            } = lookedUpQuestion;
            return res.status(200).json({
              status: 200,
              data: [{
                meetup,
                title,
                body,
                votes,
              }],
            });
          }
        }) 
      }
    }) 
  }
}

export default QuestionController;
