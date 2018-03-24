import baseController from './baseController';

// const { Business, Review } = require('../models');
import { Business, Review } from '../models';

/**
 * @description Contains all business related functionalities
 * @export
 * @class businessController
 */
export default class businessController extends baseController {
  /**
    * @description Allows user register business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static create(req, res) {
    return Business.create({
      name: req.body.name,
      address: req.body.address,
      location: req.body.location,
      phonenumber: parseInt(req.body.phonenumber, 10),
      employees: parseInt(req.body.employees, 10),
      category: req.body.category,
      userId: parseInt(req.authenticatedUser.id, 10)
    }).then((regBusiness) => {
      if (!regBusiness) {
        return res.status(400).send({
          message: 'registeration error, verify all fields and try again'
        });
      }
      res.status(201).send({
        message: 'business successfully added',
        business: regBusiness
      });
    }).catch(businessError =>
      businessController.formatError(req, res, businessError.toString()));
  }
  /**
    * @description Allow user update business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static update(req, res) {
    return Business.findOne({
      where: {
        id: parseInt(req.params.businessId, 10)
      }
    }).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: 'no business to update, register business first'
        });
      }
      if (business.dataValues.userId
        === parseInt(req.authenticatedUser.id, 10)) {
        return business
          .update({
            name: req.body.name || business.dataValues.name,
            address: req.body.address || business.dataValues.address,
            location: req.body.location || business.dataValues.location,
            phonenumber: parseInt(req.body.phonenumber, 10) ||
              business.dataValues.phonenumber,
            employees: parseInt(req.body.employees, 10) ||
              business.dataValues.employees,
            category: req.body.category || business.dataValues.category
          }).then((updatedBusiness) => {
            if (!updatedBusiness) {
              return res.status(500).send({
                message: 'update failed, try again'
              });
            }
            res.status(200).send({
              message: 'business successfully updated',
              business: business.dataValues
            });
          }).catch(updateError =>
            businessController.formatError(req, res, updateError.toString()));
      }
      return res.status(401).send({
        message: 'unathorized, business belongs to another user'
      });
    }).catch(updateFindError =>
      businessController.formatError(re, res, updateFindError.toString()));
  }
  /**
    * @description Allow user delete business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static delete(req, res) {
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'business not found'
          });
        }
        if (business.dataValues.userId ===
          parseInt(req.authenticatedUser.id, 10)) {
          return business
            .destroy()
            .then(() => res.status(200).send({
              message: 'business sucessfully deleted'
            }))
            .catch(deleteError =>
              businessController.formatError(req, res, deleteError.toString()));
        }
        res.status(401).send({
          message: 'unauthorized, business belongs to another user'
        });
      })
      .catch(deleteFindError =>
        businessController.formatError(req, res, deleteFindError.toString()));
  }
  /**
    * @description Allow user get a business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static fetch(req, res) {
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'business not found'
          });
        }
        return res.status(200).send({
          message: 'business sucessfully fetched',
          business: business.dataValues
        });
      }).catch(bizFetchError =>
        businessController.formatError(req, res, bizFetchError.toString()));
  }
  /**
    * @description Allow user filter all businesses
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @param {Function} next next controller
    * @returns {Object} server response object or next controller
    * @memberof businessController
    */
  static filter(req, res, next) {
    if (JSON.stringify(req.query) !== '{}') {
      const { location, category } = req.query;
      if (location) {
        return businessController
          .queryBy(req, res, Business, { location });
      }
      if (category) {
        return businessController
          .queryBy(req, res, Business, { category });
      }
      return res.status(400).send({
        message: 'invalid query'
      });
    }
    return next();
  }
  /**
    * @description Allow user get all businesses
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static fetchAll(req, res) {
    return Business.findAll()
      .then((business) => {
        let businesses;
        if (!business) {
          return res.status(404).send({
            message: 'no businesses found'
          });
        }
        if (Array.isArray(business)) {
          businesses = business.map(biz => biz.dataValues);
        }
        if (businesses.length <= 0) {
          return res.status(404).send({
            message: 'no businesses found'
          });
        }
        return res.status(200).send({
          message: 'businesses successfully fetched',
          business: businesses
        });
      }).catch(fetchAllError =>
        businessController.formatError(req, res, fetchAllError.toString()));
  }
  /**
    * @description Allow user review a business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static reviewBusiness(req, res) {
    if (businessController.isEmptyOrNull(req.body.review)) {
      return res.status(401).send({
        message: 'review cannot be empty'
      });
    }
    if (businessController.isEmptyOrNull(req.params.businessId)) {
      return res.status(401).send({
        message: 'business identity cannot be empty'
      });
    }
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'business not found'
          });
        }
        return Review.create({
          name: req.body.name || 'anonymous',
          review: req.body.review,
          businessId: parseInt(req.params.businessId, 10)
        }).then((review) => {
          if (!review) {
            return res.status(400).send({
              message: 'error reviewing business, verify fields and try again'
            });
          }
          delete review.dataValues.businessId;
          return res.status(201).send({
            message: 'business sucessfully reviewed',
            review: review.dataValues
          });
        }).catch(reviewError =>
          businessController.formatError(req, res, reviewError.toString()));
      }).catch(bizFetchError =>
        businessController.formatError(req, res, bizFetchError.toString()));
  }
  /**
    * @description Allow user retrieve reviews of a business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static fetchBusinessReviews(req, res) {
    return Business
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'business not found'
          });
        }
        return Review.findAll({
          where: {
            businessId: parseInt(req.params.businessId, 10)
          },
          include: [{
            model: Business,
            attributes: ['id', 'name']
          }]
        }).then((reviews) => {
          let fetchedReviews;
          if (!reviews) {
            return res.status(404).send({
              message: 'no reviews found'
            });
          }
          if (Array.isArray(reviews)) {
            fetchedReviews = reviews.map(revs => revs.dataValues);
          }
          if (fetchedReviews.length <= 0) {
            return res.status(404).send({
              message: 'no reviews found',
            });
          }
          return res.status(200).send({
            message: 'reviews successfully retrieved',
            reviews: fetchedReviews
          });
        }).catch(revFetchError =>
          businessController.formatError(req, res, revFetchError.toString()));
      }).catch(bizFetchError =>
        businessController.formatError(req, res, bizFetchError.toString()));
  }
}
