/**
 * @description Contains all helper Functions
 * @export
 * @class Helper
*/
export default class Helper {
  /**
     * @description Checks if input is empty or null
     * @static
     * @param {String} input input to check
     * @returns {boolean} true or false
     * @memberof Helper
     */
  static isEmptyOrNull(input) {
    return (!input || /^\s*$/.test(input));
  }
  /**
     * @description Checks if input is an email
     * @static
     * @param {String} email email to check
     * @returns {boolean} true or false
     * @memberof Helper
     */
  static isEmail(email) {
    return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      .test(email);
  }
  /**
     * @description Checks if password is valid
     * @static
     * @param {String} password password input to check
     * @returns {boolean} true or false
     * @memberof Helper
     */
  static isPasswordValid(password) {
    if (this.isEmptyOrNull(password)) {
      return false;
    }
    if (password.length < 6) {
      return false;
    }
    return true;
  }
  /**
     * @description Loader option config
     * @static
     * @returns {Object}
     * @memberof Helper
     */
  static loaderOptions() {
    return {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.00,
      corners: 1,
      color: '#fff',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      top: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute'
    };
  }
  /**
     * @description clears all input fields in a mounted component
     * @static
     * @param {Object} authObject flag to target authentication fields
     * @memberof Helper
     */
  static clearInputs(authObject) {
    const targetInputs = document.getElementsByTagName('input');
    let inputsLength = targetInputs.length;
    while (inputsLength--) {
      if (authObject.isAuth) {
        if (targetInputs[inputsLength].type === 'email'
          || targetInputs[inputsLength].type === 'password') {
          targetInputs[inputsLength].value = '';
        }
      }
      if (!authObject.isAuth) {
        if (targetInputs[inputsLength].type !== 'email'
          || targetInputs[inputsLength].type !== 'password'
          || targetInputs[inputsLength].type !== 'checkbox'
          || targetInputs[inputsLength].id !== 'listings-category-input'
          || targetInputs[inputsLength].id !== 'listings-location-input') {
          targetInputs[inputsLength].value = '';
        }
      }
    }
  }
}
