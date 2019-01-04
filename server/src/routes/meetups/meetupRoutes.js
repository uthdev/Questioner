// import express from 'express'
import express from 'express';
import meetupController from '../../controllers/meetupController';

const meetupRoute = express();

meetupRoute.route('/').get(meetupController.allMeetups);
meetupRoute.route('/upcoming').get(meetupController.upcomingMeetups);
meetupRoute.route('/:id').get(meetupController.getMeetup);
meetupRoute.route('/:id/rsvps').post(meetupController.rsvpMeetup);
meetupRoute.route('/').post(meetupController.createMeetup);

export default meetupRoute;
