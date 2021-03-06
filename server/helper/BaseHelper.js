import jwt from 'jsonwebtoken';

import { User, Business } from '../models';

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
   * @description name validates bus
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {FUnction} next passes control to next controller
   * @return {Boolean} true or false
   */
  static isBusinessNameValid(req, res, next) {
    if (!Number.isNaN(parseInt(req.body.name, 10))) {
      return res.status(400)
        .send({
          message: 'invalid, business name can\'t be only numbers'
        });
    }
    return Business.findOne({
      where: {
        name: req.body.name
      }
    }).then((business) => {
      if (business) {
        return res.status(409).send({
          message: 'business name already exists'
        });
      }
      return next();
    }).catch(error => BaseHelper.formatError(req, res, error.toString()));
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
        bufToString = { data: bufToString };
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
    if (req.isRaw && req.rawBody) {
      const parse = JSON.parse(req.rawBody);
      req.body = parse;
      next();
      return;
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
     * @return {Function} proceed call to next controller
     * @returns {Object} res respons object
     * @memberof BaseHelper
     */
  static userExistsInDb(req, res, user, proceed) {
    const { id, email } = user;
    return User.findOne({
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
     * @description Checks if input is an email
     * @static
     * @param {String} email email to check
     * @returns {boolean} true or false
     * @memberof Helper
     */
  /* eslint-disable */
  static isEmail(email) {
    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      .test(email);
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
   * @param {int} pageOffset pagination offset
   * @returns {Function} res response object
   * @memberof BaseHelper
   */
  static queryBy(req, res, model, queryParams, pageOffset) {
    return model.findAndCountAll({
      where: queryParams,
      limit: 10,
      offset: (parseInt(pageOffset, 10) - 1) * 10,
      order: [['id', 'ASC']]
    })
      .then((query) => {
        if (query.rows.length <= 0) {
          return res.status(404).send({
            message: 'no businesses found'
          });
        }
        return res.status(200).send({
          message: 'business successfully filtered',
          business: query.rows,
          count: query.count
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
