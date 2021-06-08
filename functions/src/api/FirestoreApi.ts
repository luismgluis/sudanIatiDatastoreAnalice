import App from "../components/App";
import { TelegramUser } from "../types/TelegramUser";
import UserWaitingReply from "../types/UserWaitingreply";
import utils from "../utils/utils";

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
        db.collection("telegram_users_replies")
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
  getUser(idTelegram: string): Promise<any> {
    const that = this;
    console.log(TAG, "clean", idTelegram);
    return new Promise<any>((resolve, reject) => {
      try {
        const app = that.app;
        const db = app.fireApp.firestore();
        db.collection("telegram_users")
          .doc(idTelegram)
          .get()
          .then((doc) => {
            //const json = JSON.stringify(data.data());
            const data = doc.data();
            console.log(
              TAG,
              "Firestoreapi data result",
              idTelegram,
              " is ",
              data
            );
            if (!utils.isEmpty(data)) {
              resolve(<any>data);
              return;
            }
            reject(null);
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
  getUserWaitingReply(idTelegramUser: string) {
    const that = this;
    return new Promise<UserWaitingReply>((resolve, reject) => {
      try {
        const app = that.app;
        const db = app.fireApp.firestore();
        db.collection("telegram_users_replies")
          .doc(idTelegramUser)
          .get()
          .then((doc) => {
            //const json = JSON.stringify(data.data());
            const data = doc.data();
            console.log(
              "Firestoreapi getUserWaitingReply",
              idTelegramUser,
              " is ",
              data
            );
            if (data) {
              resolve(new UserWaitingReply(idTelegramUser, <any>data));
              return;
            }
            reject(null);
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
  updateUserWaitingReply(waitingReply: UserWaitingReply) {
    const that = this;
    return new Promise<boolean>((resolve, reject) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      try {
        const newDoc = db
          .collection("telegram_users_replies")
          .doc(waitingReply.idTelegramUser)
          .collection("history")
          .doc();
        //          .add(waitingReply.exportUpload());
        waitingReply.idHistory = newDoc.id;
        newDoc.set(waitingReply.exportUpload());
        db.collection("telegram_users_replies")
          .doc(waitingReply.idTelegramUser)
          .set(waitingReply.exportUpload())
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
  replayUserWaitingReply(waitingReply: UserWaitingReply) {
    const that = this;
    return new Promise<boolean>((resolve, reject) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      try {
        db.collection("telegram_users_replies")
          .doc(waitingReply.idTelegramUser)
          .collection("history")
          .doc(waitingReply.idHistory!)
          .update({ reply: waitingReply.reply });

        db.collection("telegram_users_replies")
          .doc(waitingReply.idTelegramUser)
          .update({ reply: waitingReply.reply })
          .then((doc) => {
            resolve(true);
          })
          .catch((err) => {
            console.log("error", err);
            reject(null);
          });
      } catch (error) {
        console.log(TAG, "ERROR", error);
        reject(null);
      }
    });
  }
  getGroupByAt(groupAt: string): Promise<any> {
    const that = this;
    return new Promise<any>((resolve, reject) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      try {
        db.collection("groups")
          .where("at", "==", groupAt)
          .limit(1)
          .get()
          .then((data) => {
            if (data == null) {
              reject(null);
              return;
            }
            const arr: Array<string> = [];
            data.forEach((item) => arr.push(item.id));
            if (arr.length > 0) {
              resolve(arr[0]);
              return;
            }
            reject(null);
          })
          .catch((err) => {
            console.log(TAG, err);
          });
      } catch (error) {
        reject("error");
      }
    });
  }
  getResidentByCardID(user: TelegramUser): Promise<string> {
    const that = this;
    return new Promise<string>((resolve, reject) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      try {
        db.collection("groups_residents")
          .doc(user.idGroup)
          .collection("residents")
          .where("isVisitor", "==", false)
          .where("sector", "==", user.sector)
          .where("idCard", "==", user.idCard)
          .limit(1)
          .get()
          .then((data) => {
            if (data == null) {
              reject(null);
              return;
            }
            const arr: Array<string> = [];
            data.forEach((item) => arr.push(item.id));
            if (arr.length > 0) {
              resolve(arr[0]);
              return;
            }
            reject(null);
          })
          .catch((err) => {
            console.log(TAG, err);
          });
      } catch (error) {
        reject("error");
      }
    });
  }
  saveUser(user: TelegramUser): Promise<boolean> {
    const that = this;
    const save = (resolve: (res: any) => void, reject: (res: any) => void) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      const setInfo = () => {
        db.collection("telegram_users")
          .doc(user.idTelegram)
          .set(user.exportUpload())
          .then(() => resolve(true))
          .catch((err) => {
            console.log(err);
            reject("Fail on create telegram user");
          });
      };
      db.collection("groups_residents")
        .doc(user.idGroup)
        .collection("residents")
        .doc(user.id)
        .update({ telegram: user.idTelegram })
        .then(() => setInfo())
        .catch(() => reject("Fail on update resident"));
    };
    const checkTelegramUserRegistered = (
      resolve: (res: any) => void,
      reject: (res: any) => void
    ) => {
      const app = that.app;
      const db = app.fireApp.firestore();
      db.collection("telegram_users")
        .where("idCard", "==", user.idCard)
        .get()
        .then((data) => {
          const usersList: TelegramUser[] = [];
          data.forEach((doc) =>
            usersList.push(new TelegramUser(that.app, doc.id, true, doc.data()))
          );
          if (usersList.length > 0) {
            for (const key in usersList) {
              const element = usersList[key];
              if (element.idTelegram !== user.idTelegram) {
                reject(
                  "User is registered with other account, contact with administration to change your account."
                );
                return;
              }
            }
          }
          save(resolve, reject);
        })
        .catch(() => reject("Fail on check telegram account"));
    };
    const checkResident = (
      resolve: (res: any) => void,
      reject: (res: any) => void
    ) => {
      that
        .getResidentByCardID(user)
        .then((res) => {
          user.id = res;
          checkTelegramUserRegistered(resolve, reject);
        })
        .catch(() => reject("Fail on check resident"));
    };
    const checkGroup = (
      resolve: (res: any) => void,
      reject: (res: any) => void
    ) => {
      that
        .getGroupByAt(user.idGroup)
        .then((res) => {
          user.idGroup = res;
          checkResident(resolve, reject);
        })
        .catch(() => reject("Fail on check group"));
    };
    return new Promise<boolean>((resolve, reject) => {
      try {
        checkGroup(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  othersCounterPage(page: string = "", update: boolean) {
    const that = this;
    const updateCounter = async () => {
      const app = that.app;
      const db = app.fireApp.firestore();
      const myRef = db.collection("others_counter_pages").doc(page);
      if (!update) {
        const value = (await myRef.get()).data();
        return value?.counter;
      }
      let currentCounterValue = 0;
      try {
        await db
          .runTransaction(async (trans) => {
            const doc = await trans.get(myRef);
            const newCounterValue = (() => {
              let dbCounter = <any>doc.data()?.counter;
              if (typeof dbCounter === "undefined") dbCounter = 0;
              if (!dbCounter) dbCounter = 0;
              if (!isNaN(dbCounter)) {
                dbCounter++;
              } else {
                dbCounter = 1;
              }
              return dbCounter;
            })();
            trans.update(myRef, { counter: newCounterValue });
            currentCounterValue = newCounterValue;
            console.log("Transs success!");
          })
          .catch((err) => {
            if (err.code == 5) myRef.set({ counter: 1 });
          });
      } catch (e) {
        console.log("Transs fail:", e);
      }
      return currentCounterValue;
    };
    const pagesEnabled = ["frontend_home", "frontend_sesion"];
    const isEnabledString = pagesEnabled.find((item) => {
      if (page.includes(item)) {
        const rest = <any>page.replace(item, "");
        if (rest == "" || !isNaN(rest)) {
          return true;
        }
      }
      return false;
    });

    return new Promise<number>((resolve, reject) => {
      try {
        if (isEnabledString) {
          updateCounter()
            .then((res) => resolve(res))
            .catch(() => reject(null));
          return;
        }
        reject(null);
      } catch (error) {
        reject(null);
      }
    });
  }
}
