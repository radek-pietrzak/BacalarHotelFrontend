import {Expense} from './expense';

export class ResponseExpenses {
  page: any;
  hasNextPage: boolean;
  totalPages: number;
  expenses: Expense[];
}
