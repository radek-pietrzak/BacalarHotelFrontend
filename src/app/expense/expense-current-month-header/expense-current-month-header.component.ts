import {Component, OnInit} from '@angular/core';
import {ExpenseListComponent} from '../expense-list/expense-list.component';
import {ExpenseCriteriaRequestService} from '../services/expense-criteria-request.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-expense-current-month-header',
  templateUrl: './expense-current-month-header.component.html',
  styleUrls: ['../expense.css'],
})
export class ExpenseCurrentMonthHeaderComponent implements OnInit {

  constructor(expenseList: ExpenseListComponent, expenseRequest: ExpenseCriteriaRequestService) {
    this.expenseList = expenseList;
    this.expenseRequest = expenseRequest;
  }

  private expenseList: ExpenseListComponent;
  private expenseRequest: ExpenseCriteriaRequestService;
  private currentMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth = 'January';
  currentDate: string;
  requestedDate: string;
  formMonth = new FormGroup({
    month: new FormControl(this.selectedMonth, Validators.required)
  });

  ngOnInit(): void {
  }

  getYear(): string {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      return this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    }
    return 'Can\'t read the year';
  }

  getMonth(): string {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      let month = this.expenseList.responseExpenses.requestedDate.substring(5, 7);

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
      this.selectedMonth = month;
      return month;
    }
    return 'Can\'t read the month';
  }

  previousMonth(): void {
    let monthString = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    let monthNumber = Number(monthString);
    let yearString = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    let yearNumber = Number(yearString);
    monthNumber = monthNumber - 1;
    if (monthNumber === 0) {
      monthNumber = 12;
      yearNumber = yearNumber - 1;
    }
    yearString = yearNumber.toString();
    monthString = monthNumber.toString();
    if (monthNumber < 10) {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearString + '-0' + monthString + '-01';
    } else {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearString + '-' + monthString + '-01';
    }

    this.expenseList.getAllExpenses();
  }

  nextMonth(): void {
    let monthString = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    let monthNumber = Number(monthString);
    let yearString = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    let yearNumber = Number(yearString);
    monthNumber = monthNumber + 1;
    if (monthNumber === 12) {
      monthNumber = 1;
      yearNumber = yearNumber + 1;
    }
    yearString = yearNumber.toString();
    monthString = monthNumber.toString();
    if (monthNumber < 10) {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearString + '-0' + monthString + '-01';
    } else {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearString + '-' + monthString + '-01';
    }

    this.expenseList.getAllExpenses();
  }

  //
  // submitMonth(): void {
  //   const numberMonthSelected = this.months.indexOf(this.selectedMonth);
  //   // const numberMonthSelected = 5 + 1;
  //   // const numberCurrentMonth = Number(this.currentMonth);
  //   let numberCurrentMonth: number;
  //   switch (this.currentMonth) {
  //     case '01':
  //       numberCurrentMonth = 1;
  //       break;
  //     case '02':
  //       numberCurrentMonth = 2;
  //       break;
  //     case '03':
  //       numberCurrentMonth = 3;
  //       break;
  //     case '04':
  //       numberCurrentMonth = 4;
  //       break;
  //     case '05':
  //       numberCurrentMonth = 5;
  //       break;
  //     case '06':
  //       numberCurrentMonth = 6;
  //       break;
  //     case '07':
  //       numberCurrentMonth = 7;
  //       break;
  //     case '08':
  //       numberCurrentMonth = 8;
  //       break;
  //     case '09':
  //       numberCurrentMonth = 9;
  //       break;
  //     case '10':
  //       numberCurrentMonth = 10;
  //       break;
  //     case '11':
  //       numberCurrentMonth = 11;
  //       break;
  //     case '12':
  //       numberCurrentMonth = 12;
  //       break;
  //     default:
  //       numberCurrentMonth = 0;
  //   }
  //   this.month = numberCurrentMonth - numberMonthSelected;
  //   this.expenseList.getAllExpenses();
  // }


}
