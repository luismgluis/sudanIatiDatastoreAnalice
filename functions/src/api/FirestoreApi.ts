import App from "../components/app";
import budgetType from "../types/budgetType";
import utils from "../utils/utils";
//import utils from "../utils/utils";

const TAG = "FIRESTORE API";
export default class FirestoreApi {
  app: App;
  constructor(app?: App | null) {
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
  getBudgetsByYear(year: number) {
    const that = this;
    const app = that.app;
    const db = app.fireApp.firestore();
    return new Promise<budgetType[]>((resolve, reject) => {
      try {
        db.collection("sudan")
          .where("budgetPeriodEndYear", "==", year)
          .get()
          .then((result) => {
            const arr: budgetType[] = [];
            result.forEach((doc) => {
              arr.push(new budgetType(doc.id, <any>doc.data()));
            });
            resolve(arr);
          })
          .catch((err) => {
            reject("Fail Get Firestore Data");
          });
      } catch (err) {
        reject(null);
      }
    });
  }
  saveBudget(data: budgetType) {
    const that = this;
    const app = that.app;
    const db = app.fireApp.firestore();
    data.creationDate = utils.dateNowUnix();
    return db.collection("sudan").add(data.exportToUpload());
  }
}
