import userController from '../controllers/userController';
import businessController from '../controllers/businessController';

const Routes = (app) => {
  // user endpoint(s)
  app.route('/api/v1/auth/signup').post(userController.create);
  app.route('/api/v1/auth/login').post(userController.login);

  // business endpoint(s)
  app.route('/api/v1/businesses').post(businessController.create);
};

export default Routes;
