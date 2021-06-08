import budgetType from "../types/budgetType";
import { responseBudgets } from "../types/responses";
import App from "./app";

class SudanAnalice {
  private app: App;
  constructor(app: App) {
    this.app = app;
    //https://iatidatastore.iatistandard.org/api/budgets/aggregations/?group_by=participating_organisation,budget_period_end_year,budget_period_end_year&aggregations=count,activity_count,value&format=json&recipient_country=SD
  }
  parseBudgetsInYears(arrBudgets: budgetType[]) {
    const result: any = {};
    arrBudgets.forEach((item) => {
      let resultItem = result[item.budgetPeriodEndYear];
      if (typeof resultItem === "undefined")
        resultItem = { count: 0, data: {} };

      resultItem.count += 1;
      resultItem.data[item.participatingOrganisation] =
        item.value + item.activityCount; // i'm not sure if activity count should be added

      result[item.budgetPeriodEndYear] = resultItem;
    });
    return result;
  }
  getBudgetsByYear(
    year: number = 2020,
    savedData: boolean = true,
    updateSavedData: boolean = false,
    showBudgets: boolean = false
  ): Promise<responseBudgets> {
    const that = this;
    return new Promise<responseBudgets>((resolve, reject) => {
      try {
        const db = that.app.firestore();
        if (savedData) {
          db.getBudgetsByYear(year)
            .then(async (data) => {
              const parseData = that.parseBudgetsInYears(data);
              resolve({
                status: "OK",
                year: year,
                budgetYear: parseData[year],
                budgets: data,
                result: parseData,
              });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          that.app
            .itatiDatastore()
            .getBudgetsByYear(year)
            .then((data) => {
              if (updateSavedData) {
                data.forEach(async (item) => {
                  if (item.budgetPeriodEndYear === year)
                    await db.saveBudget(item);
                });
              }
              const parseData = that.parseBudgetsInYears(data);
              resolve({
                status: "OK",
                year: year,
                budgetYear: parseData[year],
                budgets: showBudgets ? data : [],
                result: parseData,
              });
            })
            .catch((err) => {
              reject(err);
            });
        }
      } catch (error) {
        reject("FAIL");
      }
    });
  }
}
export default SudanAnalice;
