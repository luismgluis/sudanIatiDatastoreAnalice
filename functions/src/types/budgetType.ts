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
    this.id = id;
    this.budgetPeriodEndYear = data!.budgetPeriodEndYear || 0;
    this.participatingOrganisation = data!.participatingOrganisation || "";
    this.count = data!.count || 0;
    this.activityCount = data!.activityCount || 0;
    this.value = data!.value || 0;
    this.creationDate = data!.creationDate || 0;
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
}
