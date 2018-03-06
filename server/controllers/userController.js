import baseController from './baseController';

import dummyData from './dummyData';

/**
 * @description Contains all user related functionalities
 * @export
 * @class userController
 */
export default class userController extends baseController {
  /**
    * @description Allows user signup
    * @static
    * @param {object} req Client request
    * @param {object} res Server response
    * @returns {Object} server response object
    * @memberof userController
    */
  static create(req, res) {
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    const found = dummyData.some(user => user.email === req.body.email);
    if (!userController.emailExists(req, res, found) &&
    userController.isPasswordValid(req, res, req.body.password)) {
      const ID = dummyData.length + 1;
      dummyData.push({
        id: ID,
        email: req.body.email,
        createdAt: new Date(),
        business: {
          reviews: []
        }
      });
      return res.status(201).send({
        message: 'user registered successfully',
        user: {
          id: dummyData[ID].id,
          email: dummyData[ID].email
        }
      });
    }
  }
}
