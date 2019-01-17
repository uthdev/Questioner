import moment from 'moment';
import helpers from '../helpers/helpers';
import responses from '../helpers/responses'
import db from '../config/index';



class MeetupController {
  static allMeetups(req, res) {
    const queryString = 'SELECT * FROM meetups';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        console.log(err);
        return responses.errorProcessing(req, res);
      }
      console.log(result.rows[0]);
      const meetups = result.rows;
      return (result.rowCount > 0) ? res.status(200).json({
        status: 200,
        data: meetups,
      }) : res.status(404).json({
        status: 404,
        error: 'No Meetup found',
      });
    });
  }

  static upcomingMeetups(req, res) {
    const queryString = `SELECT * FROM meetups WHERE happeningOn < '${moment}'`;
    return db.query(queryString, [], (err, result) => {
      if (err) {
        console.log(err);
        return responses.errorProcessing(req, res);
      }
      console.log(result.rows);
      const meetups = result.rows;
      return (result.rowCount > 0) ? res.status(200).json({
        status: 200,
        data: meetups,
      }) : res.status(404).json({
        status: 404,
        error: 'No Upcoming meetups',
      });
    });
  }

  static getMeetup(req, res) {
    const { id } = req.params;
    const queryString = 'SELECT * FROM meetups WHERE id = $1';
    return db.query(queryString, [id], (err, result) => {
      if (err) {
        console.log(err);
        return responses.errorProcessing(req, res);
      }
      if (result.rowCount <= 0) {
        return responses.nonExistingMeetup(req, res)
      }
      const meetup = result.rows[0];
      const {
        id, topic, location, happeningon, tags,
      } = meetup;
      return res.status(200).json({
        status: 200,
        data: [{
          id,
          topic,
          location,
          happeningon,
          tags,
        }],
      });
    });
  }

  static createMeetup(req, res) {
    const { error } = helpers.validateMeetup(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const { title, location, happeningOn, tags } = req.body; 
    const queryString = 'INSERT INTO meetups (topic, location, happeningOn, tags, createdOn ) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [title, location, happeningOn, tags, new Date()];
    return db.query(queryString, values, (err, result) =>{
      if (err) {
        console.log(err)
        return responses.errorProcessing(req, res);
      }
      if(result.rowCount > 0) { 
        const newMeetup = result.rows[0];
        const {
          id, topic, location, happeningon, tags,
        } = newMeetup;
        return res.status(201).json({
          status: 201,
          data: [{
            id,
            topic,
            location,
            happeningon,
            tags,
          }],
        });
      }
    })
  }
  static rsvpMeetup(req, res) {
    const { error } = helpers.validateRSVP(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    } 
    const {
      meetupId, userId, response,
    } = req.body;
    const queryString = 'SELECT topic FROM meetups WHERE id = $1';
    const values = [meetupId];
    return db.query(queryString, values, (err, result) => {
      if (err) {
        console.log(err)
        return responses.errorProcessing(req, res);
      }
      if (result.rowCount <= 0) {
        return responses.nonExistingMeetup(req, res);
      }
      if (result.rowCount > 0) {
        const topic = result.rows;
        const queryString2 = 'INSERT INTO rsvps (meetId, userId, response ) VALUES($1, $2) RETURNING *';
        const params2 = [meetupId, userId, response];
        console.log(err)
        return db.query(queryString2, params2, (err, result) => {
          if (err) {
            return responses.errorProcessing(req, res);
          }
          if (result.rowCount > 0) { 
            const rsvp = result.rows;
            const { meetupId : meetup, response : status } = rsvp;
            return res.status(201).json({
              status: 201,
              data: [{
                meetup,
                topic,
                status,
              }],
            });
          }
        })
      }
    });
  }
}

export default MeetupController;
