import Joi from 'joi';
import meetupsDb from '../data/meetups';
import rsvpsDb from '../data/rsvps';


class MeetupController {
  static allMeetups(req, res) {
    return (meetupsDb.length > 0) ? res.status(200).json({
      status: 200,
      data: meetupsDb,
    }) : res.status(404).json({
      status: 404,
      data: [],
    });
  }

  static upcomingMeetups(req, res) {
    const presentDate = new Date();
    const upcomings = [];
    for (let i = 0; i < meetupsDb.length; i++) {
      const date = meetupsDb[i].happeningOn;
      if (Date.parse(date) > Date.parse(presentDate)) {
        upcomings.push(meetupsDb[i]);
      }
    }
    return (upcomings.length > 0) ? res.status(200).json({
      status: 200,
      data: upcomings,
    }) : res.status(404).json({
      status: 404,
      data: [],
    });
  }

  static getMeetup(req, res) {
    const meetup = meetupsDb.find(meet => meet.id
      === parseInt(req.params.id, 10));
    if (!meetup) {
      return res.status(404).json({
        status: 404,
        error: 'The meetup with given ID was not found',
      });
    }

    const {
      id, title: topic, location, happeningOn, tags,
    } = meetup;
    res.status(200).json({
      status: 200,
      data: [{
        id,
        topic,
        location,
        happeningOn,
        tags,
      }],
    });
  }

  static createMeetup(req, res) {
    // Validation
    const validateMeetup = (meetup) => {
      const schema = {
        title: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        happeningOn: Joi.date().min(new Date()).iso().required(),
        tags: Joi.array().items(Joi.string()).required(),
      };
      return Joi.validate(meetup, schema);
    };

    const { error } = validateMeetup(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    const newMeetup = {
      id: meetupsDb.length + 1,
      title: req.body.title,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      tags: req.body.tags,
    };

    meetupsDb.push(newMeetup);

    const {
      id, title: topic, location, happeningOn, tags,
    } = newMeetup;
    res.status(200).json({
      status: 200,
      data: [{
        id,
        topic,
        location,
        happeningOn,
        tags,
      }],
    });
  }

  static rsvpMeetup(req, res) {
    const lookedUpMeetup = meetupsDb.find(meet => meet.id
       === parseInt(req.params.id, 10));
    if (!lookedUpMeetup) {
      return res.status(404).json({
        status: 404,
        error: 'The meetup with given ID was not found',
      });
    }
    const { title: topic } = lookedUpMeetup;
    const validateRSVP = (rsvp) => {
      const schema = {
        meetup: Joi.number().integer().positive().required(),
        user: Joi.number().integer().positive().required(),
        response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
      };
      return Joi.validate(rsvp, schema);
    };

    const { error } = validateRSVP(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
      });
    }

    const rsvp = {
      id: parseInt(String(req.body.meetup) + String(req.body.user), 10),
      meetup: req.body.meetup,
      user: req.body.user,
      response: req.body.response,
    };
    const { meetup, response: status } = rsvp;
    rsvpsDb.push(rsvp);
    res.status(200).json({
      status: 200,
      data: [{
        meetup,
        topic,
        status,
      }],
    });
  }
}

export default MeetupController;
