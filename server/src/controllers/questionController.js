import Joi from 'joi';
import questionsDB from '../data/questions';

class QuestionController {
  static postQuestion (req, res) {
    //validation
    const validateQuestion = (question) => {
      const schema = {
        user: Joi.number().integer().positive().required(),
        meetup: Joi.number().integer().positive().required(),
        title: Joi.string().min(3).required(),
        'body of question': Joi.string().min(5).required()
      }
      return Joi.validate(question, schema);
    }

    const { error } = validateQuestion(req.body);
    if(error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      })
    }
    const newQuestiion = {
      id: questionsDB.length + 1,
      createdOn: new Date(),
      createdBy: req.body.user,
      meetup: req.body.meetup,
      title: req.body.title,
      body: req.body['body of question'],
      votes: 0
    };
    questionsDB.push(newQuestiion);
    res.status(200).json({
      status: 200,
      data: [{
        user: newQuestiion.createdBy,
        meetup: newQuestiion.meetup,
        title: newQuestiion.title,
        body: newQuestiion.body
      }]
    });
  }

}

export default QuestionController;