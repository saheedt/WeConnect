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
    }
  }
}