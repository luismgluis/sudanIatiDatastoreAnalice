import * as functions from "firebase-functions";
import App from "../components/app";
import SudanAnalice from "../components/sudanAnalice";
import { responseFail } from "../types/responses";

type RequestBody = {
  type: "year" | "all" | null;
  year: number | null;
  save: boolean | null;
  update: boolean | null;
  showBudgets: boolean | null;
};

function analicebody(body: any): RequestBody {
  const result: RequestBody = {
    type: null,
    year: null,
    save: null,
    update: null,
    showBudgets: null,
  };
  if (typeof body.year !== "undefined") result.year = parseInt(body.year, 10);
  if (typeof body.type !== "undefined") result.type = body.type;

  if (typeof body.save !== "undefined")
    result.save = body.save == "true" ? true : false;

  if (typeof body.update !== "undefined")
    result.update = body.update == "true" ? true : false;

  if (typeof body.showBudgets !== "undefined")
    result.showBudgets = body.showBudgets == "true" ? true : false;

  return result;
}

export default function test(app: App) {
  return functions.https.onRequest(async (request, response) => {
    response.set({ "Access-Control-Allow-Origin": "*" });

    const sudan = new SudanAnalice(app);
    const data = analicebody(request.body);
    if (data.type === "year") {
      sudan
        .getBudgetsByYear(
          data.year!,
          data.save!,
          data.update!,
          data.showBudgets!
        )
        .then((res) => {
          response.send(res);
        })
        .catch((err) => {
          response.send(responseFail(err));
        });
    } else {
      response.send(responseFail("Type undefined"));
    }
  });
}
