import userController from '../controllers/userController';
import businessController from '../controllers/businessController';

const Routes = (app) => {
  // user endpoint(s)
  app.route('/api/v1/auth/signup').post(userController.create);
  app.route('/api/v1/auth/login').post(userController.login);
  app.route('/api/v1/auth/reset').post(userController.reset);

  // business endpoint(s)
  app.route('/api/v1/businesses')
    .post(businessController.isAuthorized, businessController.create);
  app.route('/api/v1/businesses/:businessId')
    .put(businessController.isAuthorized, businessController.update);
  app.route('/api/v1/businesses/:businessId')
    .delete(businessController.isAuthorized, businessController.delete);
  app.route('/api/v1/businesses/:businessId').get(businessController.fetch);
  app.route('/api/v1/businesses')
    .get(businessController.filter, businessController.fetchAll);
  app.route('/api/v1/businesses/:businessId/reviews')
    .post(businessController.reviewBusiness);
  app.route('/api/v1/businesses/:businessId/reviews')
    .get(businessController.fetchBusinessReviews);
};

export default Routes;
