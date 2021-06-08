class SudanAnalice {
  constructor() {
    //https://iatidatastore.iatistandard.org/api/budgets/aggregations/?group_by=participating_organisation,budget_period_end_year,budget_period_end_year&aggregations=count,activity_count,value&format=json&recipient_country=SD
  }
  getBudgetsByYear(year: number = 2020): Promise<Array<budgetType>> {
    return new Promise<Array<budgetType>>((resolve, reject) => {
      try {
        resolve([]);
      } catch (error) {
        reject(null);
      }
    });
  }
}
export default SudanAnalice;
