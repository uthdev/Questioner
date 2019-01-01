import Joi from 'joi';
import meetupsDb from '../data/meetups';
import { join } from 'path';

class MeetupController {
  static allMeetup(req, res) {
    return (meetupsDb.length > 0) ? res.status(200).json({
      status: 200,
      data: meetupsDb,
    }) : res.status(404).json({
      status: 404,
      message: 'No Meetup',
    });
  }

  static getAMeetup(req, res) {
    const meetup = meetupsDb.find(meet => meet.id === parseInt(req.params.id));
    if(!meetup) return res.status(404).json({
      status: 404,
      error: "The meetup with given ID was not found"
    })
    res.status(200).json({
      status: 200,
      data: [meetup]
  });
  }

  static createMeetup(req, res) {
    
    //Validation
    const validateMeetup = (meetup) => {
      const schema = {
        title: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        happeningOn: Joi.date().min('1-1-2019').iso().required(),
        tags: Joi.array().items(Joi.string()).required()
      }
      return Joi.validate(meetup, schema);
    }
    
    const { error } = validateMeetup(req.body);
    if(error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      })
    }

    const newMeetup = {
      id: meetupsDb.length + 1,
      title: req.body.title,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      tags: req.body.tags
    };

    meetupsDb.push(newMeetup);
    res.status(200).json({
      status: 200,
      data: [newMeetup]
    });

  }
}

export default MeetupController;
