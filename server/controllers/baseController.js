import jwt from 'jsonwebtoken';

import { User } from '../models';
/**
 * @description Contains all helper Functions
 * @export
 * @class baseController
*/
export default class baseController {
  /**
     * @description Checks if User exists
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Object} user User details
     * @returns {boolean} true or false
     * @memberof baseController
     */
  static isUser(req, res, user) {
    if (!user) {
      if (req.url === '/api/v1/auth/login') {
        res.status(401).send({
          message: 'kindly sign up first'
        });
        return false;
      }
    }
    return true;
  }
  /**
     * @description Checks if User exists
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Object} user User details
     * @param {Function} proceed calls next controller
     * @memberof baseController
     */
  static userExistsInDb(req, res, user, proceed) {
    const { id, email } = user;
    User.findOne({
      where: {
        id: parseInt(id, 10),
        email
      }
    }).then((foundUser) => {
      if (foundUser) {
        if (foundUser.dataValues.id === id &&
          foundUser.dataValues.email === email) {
          req.authenticatedUser = user;
          return proceed();
        }
      }
      return res.status(404).send({
        message: 'user does not exist'
      });
    }).catch(error => baseController.formatError(req, res, error.toString()));
  }
  /**
   * @description jwt sign function
   * @param {Object} data User data
   * @returns {object} encoded token
   */
  static sign(data) {
    return jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
  /**
   * @description Middleware to check authorization status
   * @param {Object} req client's request
   * @param {Object} res server response
   * @param {Function} next calls appropriate controller
   * @returns {Object} response object
   */
  static isAuthorized(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: 'unauthorized user'
      });
    }
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'invalid token' });
        }
        if (decoded) {
          baseController.userExistsInDb(req, res, decoded, next);
        }
      }
    );
  }
  /**
   * @description Checks if Email Exists
   * @static
   * @param {object} req Client request
   * @param {object} res Server response
   * @param {object} user User details
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static emailExists(req, res, user) {
    if (user) {
      res.status(400).send({
        message: 'email already exists',
      });
      return true;
    }
    return false;
  }
  /**
   * @description Checks if string is empty or null
   * @static
   * @param {string} str string to check
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static isEmptyOrNull(str) {
    return (!str || /^\s*$/.test(str));
  }
  /**
   * @description Checks if password is valid
   * @static
   * @param {object} req Client request
   * @param {object} res Server response
   * @param {object} password password
   * @returns {boolean} true or false
   * @memberof baseController
   */
  static isPasswordValid(req, res, password) {
    if (baseController.isEmptyOrNull(password)) {
      res.status(400).send({
        message: 'password can not be empty or null'
      });
      return false;
    }
    if (password.length < 6) {
      res.status(400).send({
        message: 'password should be 6 or more characters long'
      });
      return false;
    }
    return true;
  }
  /**
   * @description Checks what to query by
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {Object} model sequelize model
   * @param {object} queryParams query parameters
   * @returns {Function} Promise
   * @memberof baseController
   */
  static queryBy(req, res, model, queryParams) {
    return model.findAll({
      where: queryParams
    })
      .then((query) => {
        let querried;
        if (Array.isArray(query)) {
          querried = query.map(quarryData => quarryData.dataValues);
        }
        if (querried.length <= 0) {
          return res.status(404).send({
            message: 'no businesses found'
          });
        }
        return res.status(200).send({
          message: 'business successfully filtered',
          business: querried
        });
      }).catch(queryError =>
        baseController.formatError(req, res, queryError.toString()));
  }
  /**
     * @description formats sequelize error
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Function} errorMsg Sequelize error message
     * @return {Function} response object
     * @memberof baseController
     */
  static formatError(req, res, errorMsg) {
    const error = errorMsg.split(':')[0];

    switch (error) {
    case 'SequelizeValidationError':
      return res.status(400).send({
        message: 'invalid credentials, verify credentials and try again'
      });
    case 'ConnectionTimedOutError':
      return res.status(408).send({
        message: 'connection timeout, please try again'
      });
    case 'TimeoutError':
      return res.status(400).send({
        message: 'invalid input, verify input and try again'
      });
    default:
      return res.status(503).send({
        message: 'service is temporarily unavailable, please try again later'
      });
    }
  }
}
