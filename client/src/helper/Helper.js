export default class Helper {
    static isEmptyOrNull(input) {
        return (!input || /^\s*$/.test(input));
    }
    static isEmail(email) {
        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)
    }
    static isPasswordValid(password) {
      if (this.isEmptyOrNull(password)) {
        return false;
      }
      if (password.length < 6) {
        return false;
      }
      return true;
    }
}