import budgetType from "./budgetType";

type response = {
  status: "OK" | "FAIL";
};
export interface responseBudgets extends response {
  year: number;
  budgetYear: budgetType;
  budgets: budgetType[];
  result: any;
}

export interface responseFail extends response {
  error: string;
}

export const responseFail = (err: string) => {
  return { status: "FAIL", error: err };
};
