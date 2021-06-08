import * as admin from "firebase-admin";
import FirestoreApi from "../api/FirestoreApi";
import serviceAccount from "../ingrexx_json_account.json";

export type AppType = {
  started: boolean;
  fireApp: admin.app.App;
};

const TAG = "APP.TS";

class App implements AppType {
  started: boolean;
  fireApp: admin.app.App;
  private firestoredb: FirestoreApi;
  constructor() {
    this.started = false;
  }
  start() {
    try {
      admin.initializeApp();
      this.fireApp = admin.initializeApp(
        {
          credential: admin.credential.cert(<any>serviceAccount),
        },
        "ingrexx"
      );
      if (typeof this.fireApp.firestore !== "undefined") {
        this.firestoredb = new FirestoreApi(this);
        this.started = true;
      } else {
        console.log(TAG, "fireapp firestore NOOOT exits");
      }
    } catch (error) {
      this.started = false;
    }
  }
  firestore() {
    if (!this.started) {
      this.start();
    }
    return this.firestoredb;
  }
}

export default App;
