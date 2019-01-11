import questionsDB from '../data/questions';
import helpers from '../helpers/helpers';

class QuestionController {
  static postQuestion(req, res) {
    const { error } = helpers.validateQuestion(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
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

  static upvoteQuestion(req, res) {
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
}

export default QuestionController;
