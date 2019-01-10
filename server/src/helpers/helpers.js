import Joi from 'joi';

const helpers = {};

helpers.validateMeetup = (meetup) => {
  const schema = {
    title: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    happeningOn: Joi.date().min(new Date()).required(),
    tags: Joi.array().items(Joi.string()).required(),
  };
  return Joi.validate(meetup, schema);
};

helpers.validateRSVP = (rsvp) => {
  const schema = {
    meetup: Joi.number().integer().positive().required(),
    user: Joi.number().integer().positive().required(),
    response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
  };
  return Joi.validate(rsvp, schema);
};

helpers.validateQuestion = (question) => {
  const schema = {
    user: Joi.number().integer().positive().required(),
    meetup: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).required(),
    'body of question': Joi.string().min(5).required(),
  };
  return Joi.validate(question, schema);
};

export default helpers;
