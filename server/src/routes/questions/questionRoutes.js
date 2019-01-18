// import express from 'express'
import express from 'express';
import questionController from '../../controllers/questionController';
import AuthorizeUsers from '../../authentication/authController';

const questionRoute = express();

questionRoute.route('/').post(questionController.postQuestion, AuthorizeUsers.validateToken);
questionRoute.route('/:id/upvote').patch(questionController.upvoteQuestion, AuthorizeUsers.validateToken);
questionRoute.route('/:id/downvote').patch(questionController.downvoteQuestion, AuthorizeUsers.validateToken);


export default questionRoute;
