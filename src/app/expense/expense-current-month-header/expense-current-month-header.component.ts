import {Component, OnInit} from '@angular/core';
import {ExpenseListComponent} from '../expense-list/expense-list.component';
import {ExpenseCriteriaRequestService} from '../services/expense-criteria-request.service';

@Component({
  selector: 'app-expense-current-month-header',
  templateUrl: './expense-current-month-header.component.html',
  styleUrls: ['../expense.css'],
})
export class ExpenseCurrentMonthHeaderComponent implements OnInit {

  private expenseList: ExpenseListComponent;
  private expenseRequest: ExpenseCriteriaRequestService;
  private month = 0;

  constructor(expenseList: ExpenseListComponent, expenseRequest: ExpenseCriteriaRequestService) {
    this.expenseList = expenseList;
    this.expenseRequest = expenseRequest;
  }

  ngOnInit(): void {
  }

  getDate(): string {
    if (null != this.expenseList.responseExpenses.date) {
      const year = this.expenseList.responseExpenses.date.substring(0, 4);
      let month = this.expenseList.responseExpenses.date.substring(5, 7);

      switch (month) {
        case '01':
          month = 'January';
          break;
        case '02':
          month = 'February';
          break;
        case '03':
          month = 'March';
          break;
        case '04':
          month = 'April';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'June';
          break;
        case '07':
          month = 'July';
          break;
        case '08':
          month = 'August';
          break;
        case '09':
          month = 'September';
          break;
        case '10':
          month = 'October';
          break;
        case '11':
          month = 'November';
          break;
        case '12':
          month = 'December';
          break;
        default:
          month = 'Can\'t read the month';
      }
      return month + ' ' + year;
    }
    return 'Can\'t read the date';
  }

  previousMonth(): void {
    this.month = this.month - 1;
    this.expenseRequest.getCriteriaRequest.month = this.month;
    this.expenseList.getAllExpenses();
  }

  nextMonth(): void {
    this.month = this.month + 1;
    this.expenseRequest.getCriteriaRequest.month = this.month;
    this.expenseList.getAllExpenses();
  }
}
