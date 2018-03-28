import express from 'express';

import BusinessController from '../controllers/BusinessController';

const businessRoutes = express.Router();

// business endpoint(s)
// chain endpoints with multiple method calls
businessRoutes.route('/api/v1/businesses')
  .post(
    BusinessController.validateBusinessCreate,
    BusinessController.isAuthorized,
    BusinessController.create
  )
  .get(BusinessController.filter, BusinessController.fetchAll);
businessRoutes.route('/api/v1/businesses/:businessId')
  .put(BusinessController.isAuthorized, BusinessController.update)
  .delete(BusinessController.isAuthorized, BusinessController.delete)
  .get(BusinessController.fetch);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .post(BusinessController.reviewBusiness);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .get(BusinessController.fetchBusinessReviews);

export default businessRoutes;
