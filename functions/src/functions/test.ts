import * as functions from "firebase-functions";
import App from "../components/App";

export default function test(app: App) {
  return functions
    .region("us-east1")
    .https.onRequest(async (request, response) => {
      response.set({ "Access-Control-Allow-Origin": "*" });

      response.send("hello");
    });
}
