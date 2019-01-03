// import express from 'express'
import express from 'express';
import meetupController from '../../controllers/meetupController';

const meetupRoute = express();

meetupRoute.route('/').get(meetupController.allMeetup);
meetupRoute.route('/upcoming').get(meetupController.upcomingMeetup);
meetupRoute.route('/:id').get(meetupController.getAMeetup);
meetupRoute.route('/:id/rsvps').post(meetupController.rsvpMeetup);
meetupRoute.route('/').post(meetupController.createMeetup);

export default meetupRoute;
