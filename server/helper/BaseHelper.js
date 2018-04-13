import jwt from 'jsonwebtoken';

import { User } from '../models';

/**
 * @description Contains all helper Functions
 * @export
 * @class BaseHelper
*/
export default class BaseHelper {
  /**
     * @description Checks if User exists
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Object} user User details
     * @returns {boolean} true or false
     * @memberof BaseHelper
     */
  static isUser(req, res, user) {
    if (!user) {
      if (req.url === '/api/v1/auth/login') {
        res.status(404).send({
          message: 'user not found'
        });
        return false;
      }
    }
    return true;
  }
  /**
   * @description handles raw requests
   * @param {Object} req 
   * @param {Object} res 
   * @param {Buffer} buf 
   * @param {String} encoding 
   */
  static handleRaw(req, res, buf, encoding) {
    if (buf && buf.length) {
      let bufToString = buf.toString(encoding || 'utf8');
      let toJson, parsed;      
      if (bufToString.includes('{') && bufToString.includes(':') &&
          bufToString.includes(',') && bufToString.includes('}')) {
          bufToString = {'data': bufToString};
          toJson = JSON.stringify(bufToString);
          parsed = JSON.parse(toJson);
          req.rawBody = parsed.data;
          req.isRaw = true;
          return;
      }
     req.rawDataError = true; 
    }
  }
  /**
   * @description middleware to write parsed raw data to the request body
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next controller
   */
  static processBody(req, res, next) {
    console.log('req.rawBody: ', req.rawBody)
    console.log('req.isRaw', req.isRaw)
    if (req.isRaw && req.rawBody) {
      req.body = req.rawBody;
      return next();
    }
    next();
  }
  /**
     * @description Checks if User exists
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Object} user User details
     * @param {Function} proceed calls next controller
     * @memberof BaseHelper
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
    }).catch(error => BaseHelper.formatError(req, res, error.toString()));
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
    const headerAuth = req.headers.authorization || req.headers.Authorization;
    if (!headerAuth) {
      return res.status(403).send({
        message: 'unauthorized user'
      });
    }
    jwt.verify(
      headerAuth,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'invalid token' });
        }
        if (decoded) {
          BaseHelper.userExistsInDb(req, res, decoded, next);
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
   * @memberof BaseHelper
   */
  static emailExists(req, res, user) {
    if (user) {
      res.status(409).send({
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
   * @memberof BaseHelper
   */
  static isEmptyOrNull(str) {
    return (!str || /^\s*$/.test(str));
  }
  /**
   * @description validate request
   * @static
   * @param {Object} req req
   * @param {Object} res res
   * @returns {Obeject} response object
   * @param {Function} next calls appropriate controller
   * @memberof BaseHelper
   */
  static validateBusinessCreate(req, res, next) {
    const {
      name,
      phonenumber,
      address,
      location,
      employees,
      category
    } = req.body;
    if (!name || BaseHelper.isEmptyOrNull(name)) {
      return res.status(400).send({ message: 'business name is required' });
    }
    if (!phonenumber || BaseHelper.isEmptyOrNull(phonenumber)) {
      return res.status(400).send({
        message: 'business phone number is required'
      });
    }
    if (!address || BaseHelper.isEmptyOrNull(address)) {
      return res.status(400).send({
        message: 'business address is required'
      });
    }
    if (!location || BaseHelper.isEmptyOrNull(location)) {
      return res.status(400).send({
        message: 'business location is required'
      });
    }
    if (!employees || BaseHelper.isEmptyOrNull(employees)) {
      return res.status(400).send({
        message: 'employee number is required'
      });
    }
    if (!category || BaseHelper.isEmptyOrNull(category)) {
      return res.status(400).send({
        message: 'category is required'
      });
    }
    next();
  }
  /**
   * @description Checks if password is valid
   * @static
   * @param {object} req Client request
   * @param {object} res Server response
   * @param {object} password password
   * @returns {boolean} true or false
   * @memberof BaseHelper
   */
  static isPasswordValid(req, res, password) {
    if (BaseHelper.isEmptyOrNull(password)) {
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
   * @memberof BaseHelper
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
        BaseHelper.formatError(req, res, queryError.toString()));
  }
  /**
     * @description formats sequelize error
     * @static
     * @param {Object} req Client request
     * @param {Object} res Server response
     * @param {Function} errorMsg Sequelize error message
     * @return {Function} response object
     * @memberof BaseHelper
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
