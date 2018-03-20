import express from 'express';

import userController from '../controllers/userController';

const userRoutes = express.Router();

// user endpoint(s)
userRoutes.route('/api/v1/auth/signup').post(userController.create);
userRoutes.route('/api/v1/auth/login').post(userController.login);
userRoutes.route('/api/v1/auth/reset').post(userController.reset);

export default userRoutes;
