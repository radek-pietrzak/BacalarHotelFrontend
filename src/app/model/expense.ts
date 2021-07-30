export class Expense {
  id?: string;
  user?: string;
  amount?: string;
  currency?: string;
  description?: string;
  payDate?: string;
  payMethod?: string;
  expenseCategory?: string;
  createdUser?: string;
  updatedUser?: string;
  createdDate?: string;
  updatedDate?: string;


  constructor(user: string,
              amount: string,
              currency: string,
              description: string,
              payDate: string,
              payMethod: string,
              expenseCategory: string) {
    this.user = user;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.payDate = payDate;
    this.payMethod = payMethod;
    this.expenseCategory = expenseCategory;
  }

// constructor(
  //   user: string,
  //   amount: string,
  //   currency: string,
  //   description: string,
  //   payDate: string,
  //   payMethod: string,
  //   expenseCategory: string) {
  //   this.user = user;
  //   this.amount = amount;
  //   this.currency = currency;
  //   this.description = description;
  //   this.payDate = payDate;
  //   this.payMethod = payMethod;
  //   this.expenseCategory = expenseCategory;
  // }
}
