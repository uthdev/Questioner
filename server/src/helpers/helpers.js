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

export default helpers;
