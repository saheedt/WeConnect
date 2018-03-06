import userController from '../controllers/userController';

const Routes = (app) => {
  // user endpoint(s)
  app.route('/api/v1/auth/signup').post(userController.create);
};

export default Routes;
