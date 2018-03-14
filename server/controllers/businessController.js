import baseController from './baseController';

const { Business } = require('../models');

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
    if (!req.authenticatedUser) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    if (parseInt(req.body.userId, 10)
        !== parseInt(req.authenticatedUser.id, 10)) {
      return res.status(401).send({
        message: 'you are not authorized to create a business on this account'
      });
    }
    return Business.create({
      name: req.body.name,
      address: req.body.address,
      location: req.body.location,
      phonenumber: parseInt(req.body.phonenumber, 10),
      employees: parseInt(req.body.employees, 10),
      category: req.body.category,
      userId: parseInt(req.authenticatedUser.id, 10)
    }).then((business) => {
      if (!business) {
        return res.status(400).send({
          message: 'error registering business, verify all fields and try again'
        });
      }
      res.status(201).send({
        message: 'business successfully added',
        business
      });
    }).catch(businessError => res.status(500).send({
      message: 'unexpected error, please try again',
      error: businessError.toString()
    }));
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
    if (!req.authenticatedUser) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    return Business.findOne({
      where: {
        id: parseInt(req.params.businessId, 10)
      }
    }).then((business) => {
      if (!business) {
        return res.status(404).send({
          mesage: 'no business to update, register business first'
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
          }).catch(updateError => res.status(500).send({
            message: 'error occured during update, please try agin',
            error: updateError.toString()
          }));
      }
      return res.status(401).send({
        message: 'unathorized, business belongs to another user'
      });
    }).catch(updateError => res.status(500).send({
      message: 'an unexpected error has occured',
      error: updateError.toString()
    }));
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
    if (!req.authenticatedUser) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    return Business
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'you have no registered business to delete'
          });
        }
        if (recipe.dataValues.userId === req.authenticatedUser.id) {
          return business
            .destroy()
            .then(() => res.status(200).send({
              message: 'business sucessfully deleted'
            }))
            .catch(error => res.status(500).send({
              message: 'an error occured while deleting business',
              error: error.toString()
            }));
        }
        res.status(401).send({
          message: 'unauthorized, business belongs to another user'
        });
      })
      .catch(error => res.status(500).send({
        message: 'an unexpected error occured',
        error: error.toString()
      }));
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
    const fetchedBusiness = dummyData
      .find(user => user.business.id === parseInt(req.params.businessId, 10));
    if (fetchedBusiness) {
      return res.status(200).send({
        message: 'business sucessfully fetched',
        business: fetchedBusiness.business
      });
    }
    return res.status(404).send({
      message: 'no business found'
    });
  }
  /**
    * @description Allow user get all businesses
    * @static
    * @param {object} req client request
    * @param {object} res server response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static fetchAllOrFilter(req, res) {
    const filteredBy = [];
    if (JSON.stringify(req.query) !== '{}') {
      const { location, category } = req.query;
      if (location || category) {
        dummyData
          .map((user) => {
            if (location) {
              if (user.business.location
                === businessController.queryBy({ location, category })) {
                filteredBy.push(user.business);
                return true;
              }
              return false;
            }
            if (category) {
              if (user.business.category
                === businessController.queryBy({ location, category })) {
                filteredBy.push(user.business);
                return true;
              }
              return false;
            }
            return false;
          });
        if (filteredBy && filteredBy.length > 0) {
          return res.status(200).send({
            message: 'business successfully filtered',
            business: filteredBy
          });
        }
        return res.status(404).send({
          message: 'no businesses found'
        });
      }
      return res.status(400).send({
        message: 'invalid query'
      });
    }
    const allBusinesses = [];
    dummyData
      .map((user) => {
        if (user.business.name) {
          allBusinesses.push(user.business);
        }
        return false;
      });
    if (allBusinesses) {
      return res.status(200).send({
        message: 'businesses successfully fetched',
        business: allBusinesses
      });
    }
    return res.status(404).send({
      message: 'no businesses found'
    });
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
    const review = {
      name: req.body.name,
      review: req.body.review
    };
    const reviewed = dummyData
      .some((user) => {
        if (user.business.id === parseInt(req.params.businessId, 10)) {
          user.business.reviews.push(review);
          return true;
        }
        return false;
      });
    if (reviewed) {
      return res.status(201).send({
        message: 'businesses sucessfully reviewed',
        review
      });
    }
    return res.status(404).send({
      message: 'cannot review a non-existent business'
    });
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
    const reviews = dummyData
      .find(user => user.business.id === parseInt(req.params.businessId, 10));
    if (reviews) {
      return res.status(200).send({
        message: 'reviews sucessfully retrieved',
        reviews: reviews.business.reviews
      });
    }
    return res.status(404).send({
      message: 'no reviews found'
    });
  }
}
