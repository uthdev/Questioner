import express from 'express';
import usersController from '../../controllers/usersController';
import AuthorizeUsers from '../../authentication/authController';

const usersRoutes = express();

usersRoutes.route('/signup').post(usersController.signUp);
usersRoutes.route('/login').post(usersController.signIn, AuthorizeUsers.validateToken);
export default usersRoutes;