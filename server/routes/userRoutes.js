import express from 'express';

import UserController from '../controllers/UserController';

const userRoutes = express.Router();

// user endpoint(s)
// chain endpoints with multiple method calls
userRoutes.route('/api/v1/auth/signup').post(UserController.create);
userRoutes.route('/api/v1/auth/login').post(UserController.login);
userRoutes.route('/api/v1/auth/reset').post(UserController.reset);

export default userRoutes;
