import Joi from 'joi';

const helpers = {};

helpers.validateMeetup = (meetup) => {
  const schema = {
    title: Joi.string().min(5).required(),
    location: Joi.string().min(10).required(),
    happeningOn: Joi.date().min(new Date()).required(),
    tags: Joi.array().items(Joi.string()).required(),
  };
  return Joi.validate(meetup, schema);
};

helpers.validateRSVP = (rsvp) => {
  const schema = {
    meetupId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required(),
    response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
  };
  return Joi.validate(rsvp, schema);
};

helpers.validateQuestion = (question) => {
  const schema = {
    createdBy: Joi.number().integer().positive().required(),
    meetup: Joi.number().integer().positive().required(),
    title: Joi.string().min(3).required(),
    body: Joi.string().min(5).required(),
  };
  return Joi.validate(question, schema);
};

helpers.validateId = (id) => {
  const idSchema = {
    id: Joi.number().integer().positive().required(),
  };
  return Joi.validate({ id }, idSchema);
};

export default helpers;
