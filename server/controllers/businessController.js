import baseController from './baseController';

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
    if (userController.isEmptyOrNull(req.locals.loggedInUser.id)) {
      return res.status(400).send({
        message: 'you appear offline, please log in'
      });
    }
    console.log(`id ${req.locals.loggedInUser.id} got cleared`);
    let addedBusiness;
    const addBusiness = dummyData.some((user) => {
      if (user.id === req.locals.loggedInUSer.id) {
        if (user.business.name === undefined) {
          user.business.id = req.locals.loggedInUSer.id;
          user.business.name = req.body.name;
          user.business.address = req.body.address;
          user.business.location = req.body.location;
          user.business.phonenumber = req.body.phonenumber;
          user.business.employees = req.body.employees;
          user.business.category = req.body.category;
          user.business.createdAt = new Date();
          addedBusiness = user.business;
          return true;
        }
        return false;
      }
      return false;
    });
    console.log(addBusiness);
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
}
