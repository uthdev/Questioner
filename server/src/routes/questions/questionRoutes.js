// import express from 'express'
import express from 'express';
import questionController from '../../controllers/questionController';

const questionRoute = express();

questionRoute.route('/').post(questionController.postQuestion);


export default questionRoute;