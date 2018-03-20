import express from 'express';

import businessController from '../controllers/businessController';

const businessRoutes = express.Router();

// business endpoint(s)
businessRoutes.route('/api/v1/businesses')
  .post(businessController.isAuthorized, businessController.create)
  .get(businessController.filter, businessController.fetchAll);
businessRoutes.route('/api/v1/businesses/:businessId')
  .put(businessController.isAuthorized, businessController.update)
  .delete(businessController.isAuthorized, businessController.delete)
  .get(businessController.fetch);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .post(businessController.reviewBusiness);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .get(businessController.fetchBusinessReviews);

export default businessRoutes;
