interface budgeTypeType {
  budgetPeriodEndYear: number;
  participatingOrganisation: string;
  count: number;
  activityCount: number;
  value: number;
  creationDate?: number;
}
class budgetType implements budgeTypeType {
  id: string;
  budgetPeriodEndYear: number;
  participatingOrganisation: string;
  count: number;
  activityCount: number;
  value: number;
  creationDate?: number;
  constructor(id: string = "", data: budgeTypeType | null) {
    if (!data) {
      //data = <any>{};
    }
    this.id = id;
    this.budgetPeriodEndYear = data?.budgetPeriodEndYear || 0;
    this.participatingOrganisation = data?.participatingOrganisation || "";
    this.count = data?.count || 0;
    this.activityCount = data?.activityCount || 0;
    this.value = data?.value || 0;
    this.creationDate = data?.creationDate || 0;
  }
  isEmpty(): boolean {
    if (this.count === 0 && this.value === 0) {
      return true;
    }
    return false;
  }
  exportToUpload() {
    return {
      budgetPeriodEndYear: this.budgetPeriodEndYear,
      participatingOrganisation: this.participatingOrganisation,
      count: this.count,
      activityCount: this.activityCount,
      value: this.value,
      creationDate: this.creationDate,
    };
  }
  setDataFromWeb(data: any): boolean {
    try {
      this.budgetPeriodEndYear = data.budget_period_end_year;
      this.count = data.count;
      this.activityCount = data.activity_count;
      this.value = data.value;
      this.participatingOrganisation = data.participating_organisation;
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default budgetType;
