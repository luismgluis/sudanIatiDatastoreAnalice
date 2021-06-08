import axios from "axios";
import App from "../components/app";
import budgetType from "../types/budgetType";
//import utils from "../utils/utils";

const TAG = "IatiDatatore API";
export default class IatiDatatore {
  app: App;
  constructor(app?: App | null) {
    this.app = app!;
  }
  getBudgetsByYear(year: number) {
    console.log(TAG, "get");
    return new Promise<budgetType[]>((resolve, reject) => {
      try {
        axios
          .get(
            "https://iatidatastore.iatistandard.org/api/budgets/aggregations/?group_by=participating_organisation,budget_period_end_year,budget_period_end_year&aggregations=count,activity_count,value&format=json&recipient_country=SD"
          )
          .then((result) => {
            console.log(TAG, result);
            const arr: budgetType[] = [];
            if (result.data) {
              if (typeof result.data.results !== "undefined") {
                const data: Array<any> = result.data.results;
                data.forEach((item) => {
                  const newBudget = new budgetType("", null);
                  newBudget.setDataFromWeb(item);
                  if (!newBudget.isEmpty()) arr.push(newBudget);
                });
              }
            }

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
}
