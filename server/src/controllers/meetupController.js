import Joi from 'joi';
import meetupsDb from '../data/meetups';
import rsvpsDb from '../data/rsvps';


class MeetupController {
  static allMeetup(req, res) {
    return (meetupsDb.length > 0) ? res.status(200).json({
      status: 200,
      data: meetupsDb,
    }) : res.status(404).json({
      status: 404,
      data: []
    });
  }

  static upcomingMeetup(req, res) {
    const presentDate = new Date();
    const data = [];
    for(let i = 0; i < meetupsDb.length; i++) {
      let date = meetupsDb[i].happeningOn;
      if(Date.parse(date) > Date.parse(presentDate)){
        data.push(meetupsDb[i]);
      }
    }
    
    res.status(200).json({
      status: 200,
      data: data,
    })
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

  static rsvpMeetup(req, res) {
    //lookup a meetup
    //if it doesnt exist, return 404 error
    const lookedUpMeetup = meetupsDb.find(meet => meet.id === parseInt(req.params.id));
    if(!lookedUpMeetup) return res.status(404).json({
      status: 404,
      error: "The meetup with given ID was not found"
    })
    const { title : topic } = lookedUpMeetup;
    //if found, validate the req
    const validateRSVP = (rsvp) => {
      const schema = {
        meetup: Joi.number().integer().positive().required(),
        user: Joi.number().integer().positive().required(),
        response: Joi.any().valid(['yes', 'no', 'maybe']).required()
      }

      return Joi.validate(rsvp, schema);
    }
    //if request fails validation, return error 400 bad request
    const { error } = validateRSVP(req.body);
    if(error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      })
    }

    const rsvp = {
      id: parseInt(String(req.body.meetup) + String(req.body.user)),
      meetup: req.body.meetup,
      user: req.body.user,
      response: req.body.response
    }
    const { meetup, response : status } = rsvp;
    rsvpsDb.push(rsvp);
    res.status(200).json({
      status: 200,
      data: [{
        meetup: meetup,
        topic: topic,
        status: status
      }]
    });
  }

}

export default MeetupController;
