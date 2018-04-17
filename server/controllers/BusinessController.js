import BaseHelper from '../helper/BaseHelper';
import { Business, Review } from '../models';

/**
 * @description Contains all business related functionalities
 * @export
 * @class BusinessController
 */
export default class BusinessController extends BaseHelper {
  /**
    * @description Allows user register business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static create(req, res) {
    if (req.rawDataError) {
      res.status(400)
        .send({message: 'data object invalid, \'key:value\' pair required'});
      return;
    }
    if (BusinessController.isBusinessNameValid(req, res, Business)) {
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
        BusinessController.formatError(req, res, businessError.toString()));
    }
  }
  /**
    * @description Allow user update business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static update(req, res) {
    if (req.rawDataError) {
      return res.status(400)
        .send({message: 'data object invalid, \'key:value\' pair required'});
    }
    return Business.findOne({
      where: {
        id: parseInt(req.params.businessId, 10)
      }
    }).then((business) => {
      if (!business) {
        res.status(404).send({
          message: 'no business to update, register business first'
        });
        return;
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
              res.status(417).send({
                message: 'update failed, try again'
              });
              return;
            }
            res.status(200).send({
              message: 'business successfully updated',
              business: business.dataValues
            });
          }).catch(updateError =>
            BusinessController.formatError(req, res, updateError.toString()));
      }
      res.status(401).send({
        message: 'unathorized, business belongs to another user'
      });
      return
    }).catch(updateFindError =>
      BusinessController.formatError(re, res, updateFindError.toString()));
  }
  /**
    * @description Allow user delete business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static delete(req, res) {
    if (req.rawDataError) {
      res.status(400)
        .send({message: 'data object invalid, \'key:value\' pair required'});
      return
    }
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          res.status(404).send({
            message: 'business not found'
          });
          return;
        }
        if (business.dataValues.userId ===
          parseInt(req.authenticatedUser.id, 10)) {
          return business
            .destroy()
            .then(() => res.status(200).send({
              message: 'business sucessfully deleted'
            }))
            .catch(deleteError =>
              BusinessController.formatError(req, res, deleteError.toString()));
        }
        res.status(401).send({
          message: 'unauthorized, business belongs to another user'
        });
      })
      .catch(deleteFindError =>
        BusinessController.formatError(req, res, deleteFindError.toString()));
  }
  /**
    * @description Allow user get a business details
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static fetch(req, res) {
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          res.status(404).send({
            message: 'business not found'
          });
        return;
        }
        return res.status(200).send({
          message: 'business sucessfully fetched',
          business: business.dataValues
        });
      }).catch(bizFetchError =>
        BusinessController.formatError(req, res, bizFetchError.toString()));
  }
  /**
    * @description Allow user filter all businesses
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @param {Function} next next controller
    * @returns {Object} server response object or next controller
    * @memberof BusinessController
    */
  static filter(req, res, next) {
    if (JSON.stringify(req.query) !== '{}') {
      const { location, category } = req.query;
      if (location) {
        const locationQuery = {
          location: {
            $like: `%${location}%`
          }
        };
        return BusinessController
          .queryBy(req, res, Business, locationQuery);
      }
      if (category) {
        const categoryQuery = {
          category: {
              $like: `%${category}%`
          }
        };
        return BusinessController
          .queryBy(req, res, Business, categoryQuery);
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
    * @memberof BusinessController
    */
  static fetchAll(req, res) {
    return Business.findAll()
      .then((business) => {
        let businesses;
        if (Array.isArray(business)) {
          businesses = business.map(biz => biz.dataValues);
        }
        if (businesses.length <= 0) {
          res.status(404).send({
            message: 'no businesses found'
          });
          return;
        }
        return res.status(200).send({
          message: 'businesses successfully fetched',
          businesses
        });
      }).catch(fetchAllError =>
        BusinessController.formatError(req, res, fetchAllError.toString()));
  }
  /**
    * @description Allow user review a business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static reviewBusiness(req, res) {
    if (req.rawDataError) {
      res.status(400)
        .send({message: 'data object invalid, \'key:value\' pair required'});
      return;
    }
    if (BusinessController.isEmptyOrNull(req.body.review)) {
      res.status(401).send({
        message: 'review cannot be empty'
      });
      return;
    }
    if (BusinessController.isEmptyOrNull(req.params.businessId)) {
      res.status(401).send({
        message: 'business identity cannot be empty'
      });
      return;
    }
    return Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          res.status(404).send({
            message: 'business not found'
          });
          return;
        }
        return Review.create({
          name: req.body.name || 'anonymous',
          review: req.body.review,
          businessId: parseInt(req.params.businessId, 10)
        }).then((review) => {
          if (!review) {
            res.status(400).send({
              message: 'error reviewing business, verify fields and try again'
            });
            return;
          }
          delete review.dataValues.businessId;
          return res.status(201).send({
            message: 'business sucessfully reviewed',
            review: review.dataValues
          });
        }).catch(reviewError =>
          BusinessController.formatError(req, res, reviewError.toString()));
      }).catch(bizFetchError =>
        BusinessController.formatError(req, res, bizFetchError.toString()));
  }
  /**
    * @description Allow user retrieve reviews of a business
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static fetchBusinessReviews(req, res) {
    return Business
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          res.status(404).send({
            message: 'business not found'
          });
          return;
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
          if (Array.isArray(reviews)) {
            fetchedReviews = reviews.map(revs => revs.dataValues);
          }
          if (fetchedReviews.length <= 0) {
            res.status(404).send({
              message: 'no reviews found',
            });
            return;
          }
          return res.status(200).send({
            message: 'reviews successfully retrieved',
            reviews: fetchedReviews
          });
        }).catch(revFetchError =>
          BusinessController.formatError(req, res, revFetchError.toString()));
      }).catch(bizFetchError =>
        BusinessController.formatError(req, res, bizFetchError.toString()));
  }
}
