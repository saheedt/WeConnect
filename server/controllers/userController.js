import { log } from 'util';

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
    * @param {object} req client request
    * @param {object} res erver response
    * @returns {Object} server response object
    * @memberof userController
    */
  static create(req, res) {
    log(`req [req] -> ${req}`);
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    const found = dummyData.some(user => user.email === req.body.email);
    console.log(`first [found] -> ${found}`);
    if (!userController.emailExists(req, res, found) &&
    userController.isPasswordValid(req, res, req.body.password)) {
      const ID = dummyData.length + 1,
        userIndex = ID - 1;
      dummyData.push({
        id: ID,
        email: req.body.email,
        createdAt: new Date(),
        business: {
          reviews: []
        }
      });
      console.log(`userIndex: , ${userIndex}`);
      console.log(`id: , ${dummyData[userIndex].id}`);
      console.log(`email: , ${dummyData[userIndex].email}`);
      return res.status(201).send({
        message: 'user registered successfully',
        user: {
          id: dummyData[userIndex].id,
          email: dummyData[userIndex].email
        }
      });
    }
  }
}
