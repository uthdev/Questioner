// import express from 'express'
import express from 'express';
import meetupController from '../../controllers/meetupController';

const meetupRoute = express();

meetupRoute.route('/').get(meetupController.allMeetup);

export default meetupRoute;
