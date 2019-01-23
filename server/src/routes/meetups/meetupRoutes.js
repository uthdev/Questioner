import express from 'express';
import meetupController from '../../controllers/meetupController';
import authorizeUsers from '../../authentication/authController';

const meetupRoute = express();

meetupRoute.route('/').get(meetupController.allMeetups);
meetupRoute.route('/upcoming').get(meetupController.upcomingMeetups, authorizeUsers.validateToken);
meetupRoute.route('/:id').get(meetupController.getMeetup, authorizeUsers.validateToken);
meetupRoute.route('/:id/rsvps').post(meetupController.rsvpMeetup, authorizeUsers.validateToken);
meetupRoute.route('/:id').delete(meetupController.deleteMeetup, authorizeUsers.validateToken);
meetupRoute.route('/').post(meetupController.createMeetup, authorizeUsers.validateToken);

export default meetupRoute;
