// import express from 'express'
import express from 'express';
import questionController from '../../controllers/questionController';

const questionRoute = express();

questionRoute.route('/').post(questionController.postQuestion);
questionRoute.route('/:id/upvote').patch(questionController.upvoteQuestion);


export default questionRoute;