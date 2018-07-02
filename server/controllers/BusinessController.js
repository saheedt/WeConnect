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
    if (req.rawDataError === true) {
      return res.status(400)
        .send({ message: 'data object invalid, \'key:value\' pair required' });
    }
    return Business.create({
      name: req.body.name,
      address: req.body.address,
      location: req.body.location,
      phonenumber: parseInt(req.body.phonenumber, 10),
      employees: parseInt(req.body.employees, 10),
      category: req.body.category,
      userId: parseInt(req.authenticatedUser.id, 10),
      image_url: req.body.image_url
    }).then((regBusiness) => {
      if (!regBusiness) {
        return res.status(400).send({
          message: 'registeration error, verify all fields and try again'
        });
      }
      return res.status(201).send({
        message: 'business successfully added',
        business: regBusiness
      });
    }).catch(businessError =>
      BusinessController.formatError(req, res, businessError.toString()));
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
        .send({ message: 'data object invalid, \'key:value\' pair required' });
    }
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
              return res.status(417).send({
                message: 'update failed, try again'
              });
            }
            return res.status(200).send({
              message: 'business successfully updated',
              business: business.dataValues
            });
          }).catch(updateError =>
            BusinessController.formatError(req, res, updateError.toString()));
      }
      return res.status(401).send({
        message: 'unathorized, business belongs to another user'
      });
    }).catch(updateFindError =>
      BusinessController.formatError(req, res, updateFindError.toString()));
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
      return res.status(400)
        .send({ message: 'data object invalid, \'key:value\' pair required' });
    }
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
              BusinessController.formatError(req, res, deleteError.toString()));
        }
        return res.status(401).send({
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
          return res.status(404).send({
            message: 'business not found'
          });
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
      const { location, category, page } = req.query;
      if (location) {
        const locationQuery = {
          location: {
            $iLike: `%${location}%`
          }
        };
        if (Number.isNaN(parseInt(page, 10))) {
          return BusinessController
            .queryBy(req, res, Business, locationQuery, 1);
        }
        return BusinessController
          .queryBy(req, res, Business, locationQuery, page);
      }
      if (category) {
        const categoryQuery = {
          category: {
            $iLike: `%${category}%`
          }
        };
        if (Number.isNaN(parseInt(page, 10))) {
          return BusinessController
            .queryBy(req, res, Business, categoryQuery, 1);
        }
        return BusinessController
          .queryBy(req, res, Business, categoryQuery, page);
      }
      if (page) {
        return next();
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
    if (Number.isNaN(parseInt(req.query.page, 10))) {
      req.query.page = 1;
    }
    // .findAll()
    return Business.findAndCountAll({
      limit: 10,
      offset: (parseInt(req.query.page, 10) - 1) * 10,
      order: [['id', 'ASC']]
    })
      .then((business) => {
        if (business.rows.length <= 0) {
          return res.status(404).send({
            message: 'no businesses found'
          });
        }
        return res.status(200).send({
          message: 'businesses successfully fetched',
          businesses: business.rows
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
      return res.status(400)
        .send({ message: 'data object invalid, \'key:value\' pair required' });
    }
    if (BusinessController.isEmptyOrNull(req.body.review)) {
      return res.status(401).send({
        message: 'review cannot be empty'
      });
    }
    if (BusinessController.isEmptyOrNull(req.params.businessId)) {
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
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'business not found'
          });
        }
        if (Number.isNaN(parseInt(req.query.page, 10))) {
          req.query.page = 1;
        }
        return Review.findAndCountAll({
          where: {
            businessId: parseInt(req.params.businessId, 10)
          },
          limit: 5,
          offset: (parseInt(req.query.page, 10) - 1) * 5,
          order: [['id', 'DESC']],
          include: [{
            model: Business,
            attributes: ['id', 'name']
          }]
        }).then((reviews) => {
          if (reviews.rows.length <= 0) {
            return res.status(404).send({
              message: 'no reviews found',
            });
          }
          return res.status(200).send({
            message: 'reviews successfully retrieved',
            reviews: reviews.rows,
            count: reviews.count
          });
        }).catch(revFetchError =>
          BusinessController.formatError(req, res, revFetchError.toString()));
      }).catch(bizFetchError =>
        BusinessController.formatError(req, res, bizFetchError.toString()));
  }
  /**
    * @description Retrieve businesses belonging to a user
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof BusinessController
    */
  static fetchUserBusinesses(req, res) {
    return Business.findAll({
      where: {
        userId: parseInt(req.params.userId, 10)
      }
    }).then((businesses) => {
      let fetchedBusinesses;
      if (Array.isArray(businesses)) {
        fetchedBusinesses = businesses.map(business => business.dataValues);
      }
      if (fetchedBusinesses.length <= 0) {
        return res.status(404).send({
          message: 'no business found'
        });
      }
      return res.status(200).send({
        message: 'user businesses successfully retrieved',
        businesses: fetchedBusinesses
      });
    }).catch(userBizfetchError =>
      BusinessController.formatError(req, res, userBizfetchError.toString()));
  }
}
