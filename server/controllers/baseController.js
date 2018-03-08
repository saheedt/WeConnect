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
      res.status(404).send({
        message: 'user not found'
      });
      return false;
    }
    return true;
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
   * @param {object} queryParams query parameters
   * @returns {string} location or category
   * @memberof baseController
   */
  static queryBy(queryParams) {
    const { location, category } = queryParams;
    if (location) {
      return location;
    }
    if (category) {
      return category;
    }
  }
}
