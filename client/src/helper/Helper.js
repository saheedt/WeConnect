export default class Helper {
    static isEmptyOrNull(input) {
        return (!input || /^\s*$/.test(input));
    }
}