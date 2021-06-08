import App from "../components/app";
//import utils from "../utils/utils";

const TAG = "FIRESTORE API";
export default class FirestoreApi {
  start: boolean;
  app: App;
  constructor(app?: App | null) {
    this.start = true;
    this.app = app!;
  }
  updateTemp(idTelegram: string, value: string) {
    const that = this;
    return new Promise<any>((resolve, reject) => {
      try {
        const app = that.app;
        console.log(TAG, app.fireApp.name);
        const db = app.fireApp.firestore();
        db.collection("sudan")
          .doc(`${idTelegram}`)
          .set({ test: value })
          .then((doc) => {
            resolve(true);
          })
          .catch((err) => {
            console.log("error", err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
}
