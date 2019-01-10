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