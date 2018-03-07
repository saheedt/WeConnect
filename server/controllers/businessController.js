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
    * @param {object} res erver response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static create(req, res) {
    if (!req.body.userId) {
      return res.status(400).send({
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
    return res.status(401).send({
      message: 'business exists for user, update business as an alternative'
    });
  }
  /**
    * @description Allow user update business details
    * @static
    * @param {object} req client request
    * @param {object} res erver response
    * @returns {Object} server response object
    * @memberof businessController
    */
  static update(req, res) {
    if (!req.body.userId) {
      return res.status(400).send({
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
    return res.status(401).send({
      message: 'no business to update, register business first'
    });
  }
}
