class Department {
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(private id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("正しい値を設定してください。");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d1", []);
    return this.instance;
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Wiki");
console.log(employee1);

// const accounting = new AccountingDepartment("d1", []);
const accounting = AccountingDepartment.getInstance();

accounting.addReport("Something");
accounting.addReport("It is so beautiful bird!!!");
accounting.mostRecentReport = "通期会計レポート";
console.log(accounting.mostRecentReport);

accounting.printReports();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.describe();
accounting.printEmployeeInformation();
