import {PayMethod} from './pay-method';
import {ExpenseCategory} from './expense-category';

export class Expense {
  id?: number;
  user?: string;
  amount?: number;
  currency?: string;
  description?: string;
  payDate?: string;
  payMethod?: PayMethod;
  expenseCategory?: ExpenseCategory;
  createdUser?: string;
  updatedUser?: string;
  createdDate?: string;
  updatedDate?: string;


  constructor(
    user: string,
    amount: number,
    currency: string,
    description: string,
    payDate: string,
    payMethod: PayMethod,
    expenseCategory: ExpenseCategory) {
    this.user = user;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.payDate = payDate;
    this.payMethod = payMethod;
    this.expenseCategory = expenseCategory;
  }
}
