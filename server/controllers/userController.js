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
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    const found = dummyData.some(user => user.email === req.body.email);
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
      return res.status(201).send({
        message: 'user registered successfully',
        user: {
          id: dummyData[userIndex].id,
          email: dummyData[userIndex].email
        }
      });
    }
  }
  /**
   * @description Allows registered users sign in
   * @static
   * @param {object} req client request
   * @param {object} res server Response
   * @returns {object} server response object
   * @memberof userController
   */
  static login(req, res) {
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    const found = dummyData.some(user => user.email === req.body.email);
    let appUser;
    if (userController.isUser(req, res, found)) {
      const isPasswordSame = dummyData.some((user) => {
        if (user.email === req.body.email &&
            user.password === req.body.password) {
          appUser = {
            id: user.id,
            email: user.email
          };
          return true;
        }
        return false;
      });
      if (isPasswordSame) {
        req.locals.loggedInUser = { id: user.id, email: user.email };
        return res.status(200).send({
          message: 'login success',
          user: appUser
        });
      }
      return res.status(401).send({
        message: 'email and/or password invalid'
      });
    }
  }
}
