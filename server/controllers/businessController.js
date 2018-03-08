import baseController from './baseController';
import dummyData from './dummyData';

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
    if (!req.body.userId) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    let addedBusiness;
    const addBusiness = dummyData.some((user) => {
      if (user.id === parseInt(req.body.userId, 10) && !user.business.name) {
        user.business.id = parseInt(req.body.userId, 10);
        user.business.name = req.body.name;
        user.business.address = req.body.address;
        user.business.location = req.body.location;
        user.business.phonenumber = parseInt(req.body.phonenumber, 10);
        user.business.employees = req.body.employees;
        user.business.category = req.body.category;
        user.business.createdAt = new Date();
        addedBusiness = user.business;
        return true;
      }
      return false;
    });
    if (addBusiness) {
      return res.status(201).send({
        message: 'business sucessfully added',
        business: addedBusiness
      });
    }
    return res.status(200).send({
      message: 'business exists for user, update business as an alternative'
    });
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
    if (!req.body.userId) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    let updatedBusiness;
    const updateBusiness = dummyData.some((user) => {
      if (user.id === parseInt(req.body.userId, 10) &&
      user.business.id === parseInt(req.params.businessId, 10)) {
        Object.assign(user.business, req.body.name && { name: req.body.name });
        Object.assign(
          user.business,
          req.body.address && { address: req.body.address }
        );
        Object.assign(
          user.business,
          req.body.location && { location: req.body.location }
        );
        Object.assign(
          user.business,
          req.body.phonenumber &&
          { phonenumber: parseInt(req.body.phonenumber, 10) }
        );
        Object.assign(
          user.business,
          req.body.employees && { employees: parseInt(req.body.employees, 10) }
        );
        Object.assign(
          user.business,
          req.body.category && { category: req.body.category }
        );
        user.business.updatedAt = new Date();
        updatedBusiness = user.business;
        return true;
      }
      return false;
    });
    if (updateBusiness) {
      return res.status(201).send({
        message: 'business sucessfully updated',
        business: updatedBusiness
      });
    }
    return res.status(404).send({
      message: 'no business to update, register business first'
    });
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
    if (!req.body.userId) {
      return res.status(401).send({
        message: 'you appear offline, please log in'
      });
    }
    let deletedBusiness;
    const deleteBusiness = dummyData.some((user) => {
      if (user.id === parseInt(req.body.userId, 10) &&
      user.business.id === parseInt(req.params.businessId, 10)) {
        user.business = { review: [] };
        deletedBusiness = user.business;
        return true;
      }
      return false;
    });
    if (deleteBusiness) {
      return res.status(200).send({
        message: 'business sucessfully deleted',
        business: deletedBusiness,
        dummyData
      });
    }
    return res.status(404).send({
      message: 'no business to delete'
    });
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
    const { location } = req.query;
    let byLocation;
    if (location) {
      byLocation = dummyData.map(user => user.business.location === location);
      if (byLocation) {
        return res.status(200).send({
          message: 'business successfully filtered',
          business: byLocation
        });
      }
      return res.status(404).send({
        message: 'no businesses found'
      });
    }
    const allBusinesses = dummyData.map(user => user.business);
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
      return res.status(200).send({
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
