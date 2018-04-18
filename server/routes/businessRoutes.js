import express from 'express';

import BusinessController from '../controllers/BusinessController';

const businessRoutes = express.Router();

// business endpoint(s)
// chain endpoints with multiple method calls
businessRoutes.route('/api/v1/businesses')
  .post(
    BusinessController.processBody,
    BusinessController.validateBusinessCreate,
    BusinessController.isBusinessNameValid,
    BusinessController.isAuthorized,
    BusinessController.create
  )
  .get(BusinessController.filter, BusinessController.fetchAll);
businessRoutes.route('/api/v1/businesses/:businessId')
  .put(
    BusinessController.processBody,
    BusinessController.isBusinessNameValid,
    BusinessController.isAuthorized,
    BusinessController.update
  )
  .delete(
    BusinessController.processBody,
    BusinessController.isAuthorized,
    BusinessController.delete
  )
  .get(BusinessController.fetch);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .post(BusinessController.processBody, BusinessController.reviewBusiness);
businessRoutes.route('/api/v1/businesses/:businessId/reviews')
  .get(BusinessController.fetchBusinessReviews);

export default businessRoutes;
