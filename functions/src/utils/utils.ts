import * as functions from "firebase-functions";

class utils {
  constructor() {
    //
  }
  dateNowUnix(): number {
    return Math.round(+new Date() / 1000);
  }
  isEmpty(obj: any): boolean {
    if (typeof obj === "undefined") {
      return true;
    }
    if (obj == null) {
      return true;
    }
    if (typeof obj === "object") {
      if (Object.keys(obj).length === 0) {
        return true;
      }
    }
    return false;
  }
  randomNumber(min: number, max: number) {
    return parseInt(Math.random() * (max - min) + min + "", 10);
  }
}
export default new utils();

export function print(...args: any[]) {
  functions.logger.log("Print: ", args);
}
