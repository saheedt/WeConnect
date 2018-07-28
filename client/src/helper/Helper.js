/**
 * @description Contains all helper Functions
 * @export
 * @class Helper
*/

require('dotenv').config();


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
  /* eslint-disable */
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
  /**
     * @description returns default image url for businesses without images
     * @static
     * @returns {String}
     * @memberof Helper
     */
  static defaultImageUrl() {
    return 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png';
  }
  /**
   * @description Fires Materialize toatser
   * @param {Object} options
   * @param {Number} duration
   * @memberof Helper
   */
  static showToast(options, duration) {
    M.toast(options, duration);
  }
  /**
   * @description returns the upload image icon
   * @memberof Helper
   */
  static uploadImage() {
    return "data:image/svg+xml,%3Csvg enable-background='new 0 0 64 64' height='64px' id='Layer_1' version='1.1' viewBox='0 0 64 64' width='64px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg%3E%3Cpath d=' M10,41.3v12c0,1.1,0.9,2,2,2h40c1.1,0,2-0.9,2-2v-12H10z' fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'/%3E%3Cpath d=' M42.6,19.4c3.8,7.3,7.6,14.7,11.4,22c-14.7,0-29.3,0-44,0c3.8-7.3,7.6-14.7,11.4-22' fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'/%3E%3Cg%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='32' x2='32' y1='8.7' y2='28.2'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='32' x2='35.7' y1='8.7' y2='12.4'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='28' x2='31.7' y1='12.4' y2='8.7'/%3E%3C/g%3E%3Ccircle cx='47.3' cy='46.7' fill='none' r='2.3' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='21.4' x2='27.5' y1='19.4' y2='19.4'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='36.4' x2='42.5' y1='19.4' y2='19.4'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='21.9' x2='41.9' y1='36.4' y2='36.4'/%3E%3Cline fill='none' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='23.5' x2='40.2' y1='32.1' y2='32.1'/%3E%3C/g%3E%3C/svg%3E"
  }
  /**
   * @description configures cloudinary sdk for image uplaod
   * @param {Function} cloudinarySdk
   * @memberof Helper
   */
  static cloudinaryConfig(cloudinarySdk) {
    cloudinarySdk.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }
}
