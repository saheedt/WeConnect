import userController from '../controllers/userController';

const userRoutes = (app) => {
  // user endpoint(s)
  app.route('/api/v1/auth/signup').post(userController.create);
  app.route('/api/v1/auth/login').post(userController.login);
  app.route('/api/v1/auth/reset').post(userController.reset);
};

export default userRoutes;
