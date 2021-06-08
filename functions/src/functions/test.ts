import * as functions from "firebase-functions";
import App from "../components/app";

export default function test(app: App) {
  return functions
    .region("us-east1")
    .https.onRequest(async (request, response) => {
      response.set({ "Access-Control-Allow-Origin": "*" });

      app
        .firestore()
        .updateTemp("ss", "gg")
        .then((s) => {
          response.send("hello");
        })
        .catch((err) => {
          response.send("err");
        });
    });
}
