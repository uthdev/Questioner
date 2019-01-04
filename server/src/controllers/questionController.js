import Joi from 'joi';
import questionsDB from '../data/questions';

class QuestionController {
  static postQuestion(req, res) {
    // validation
    const validateQuestion = (question) => {
      const schema = {
        user: Joi.number().integer().positive().required(),
        meetup: Joi.number().integer().positive().required(),
        title: Joi.string().min(3).required(),
        'body of question': Joi.string().min(5).required(),
      };
      return Joi.validate(question, schema);
    };
    const { error } = validateQuestion(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }
    const newQuestion = {
      id: questionsDB.length + 1,
      createdOn: new Date(),
      createdBy: req.body.user,
      meetup: req.body.meetup,
      title: req.body.title,
      body: req.body['body of question'],
      votes: 0,
    };
    questionsDB.push(newQuestion);
    const {
      createdBy: user, meetup, title, body,
    } = newQuestion;
    res.status(200).json({
      status: 200,
      data: [{
        user,
        meetup,
        title,
        body,
      }],
    });
  }

  static upvoteQuestion(req, res) {
    // get a specific question
    const lookedUpQuestion = questionsDB.find(question => question.id
      === parseInt(req.params.id, 10));
    if (!lookedUpQuestion) {
      return res.status(404).json({
        status: 404,
        error: 'No question matching the given ID',
      });
    }

    lookedUpQuestion.votes += 1;
    const {
      meetup, title, body, votes,
    } = lookedUpQuestion;
    res.status(200).json({
      status: 200,
      data: [{
        meetup,
        title,
        body,
        votes,
      }],
    });
  }

  static downvoteQuestion(req, res) {
    const lookedUpQuestion = questionsDB.find(question => question.id
      === parseInt(req.params.id, 10));
    if (!lookedUpQuestion) {
      return res.status(404).json({
        status: 404,
        error: 'No question matching the given ID',
      });
    }

    lookedUpQuestion.votes -= 1;
    const {
      meetup, title, body, votes,
    } = lookedUpQuestion;
    res.status(200).json({
      status: 200,
      data: [{
        meetup,
        title,
        body,
        votes,
      }],
    });
  }
}

export default QuestionController;
