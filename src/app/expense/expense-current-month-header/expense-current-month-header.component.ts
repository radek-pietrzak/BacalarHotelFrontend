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
    const monthString = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    let monthNumber = Number(monthString);
    const yearString = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    let yearNumber = Number(yearString);
    monthNumber = monthNumber - 1;
    if (monthNumber === 0) {
      monthNumber = 12;
      yearNumber = yearNumber - 1;
    }

    if (monthNumber < 10) {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-0' + monthNumber + '-01';
    } else {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-' + monthNumber + '-01';
    }

    this.expenseList.getAllExpenses();
  }

  nextMonth(): void {
    const monthString = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    let monthNumber = Number(monthString);
    const yearString = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    let yearNumber = Number(yearString);
    monthNumber = monthNumber + 1;
    if (monthNumber === 12) {
      monthNumber = 1;
      yearNumber = yearNumber + 1;
    }

    if (monthNumber < 10) {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-0' + monthNumber + '-01';
    } else {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-' + monthNumber + '-01';
    }

    this.expenseList.getAllExpenses();
  }


  submitDate(): void {
    let monthNumber: number;
    switch (this.selectedMonth) {
      case 'January':
        monthNumber = 1;
        break;
      case 'February':
        monthNumber = 2;
        break;
      case 'March':
        monthNumber = 3;
        break;
      case 'April':
        monthNumber = 4;
        break;
      case 'May':
        monthNumber = 5;
        break;
      case 'June':
        monthNumber = 6;
        break;
      case 'July':
        monthNumber = 7;
        break;
      case 'August':
        monthNumber = 8;
        break;
      case 'September':
        monthNumber = 9;
        break;
      case 'October':
        monthNumber = 10;
        break;
      case 'November':
        monthNumber = 11;
        break;
      case 'December':
        monthNumber = 12;
        break;
      default:
        monthNumber = 0;
    }
    const yearNumber = 2021;

    if (monthNumber < 10) {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-0' + monthNumber + '-01';
    } else {
      this.expenseRequest.getCriteriaRequest.requestedDate = yearNumber + '-' + monthNumber + '-01';
    }

    this.expenseList.getAllExpenses();

  }


}
