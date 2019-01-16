import express from 'express';
import usersController from '../../controllers/usersController';

const usersRoutes = express();

usersRoutes.route('/signup').post(usersController.signUp);
usersRoutes.route('/login').post(usersController.signIn);
export default usersRoutes;