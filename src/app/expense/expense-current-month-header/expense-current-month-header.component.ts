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
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth = '';
  years: number[];
  selectedYear = 2021;
  currentDate: string;
  flagEditDateActive = false;
  formDate = new FormGroup({
    month: new FormControl(this.selectedMonth, Validators.required),
    year: new FormControl(this.selectedYear, Validators.required)
  });

  ngOnInit(): void {
    // this.selectedMonth = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    // this.selectedYear = Number(this.expenseList.responseExpenses.requestedDate.substring(0, 4));
  }

  getYear(): string {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      const year = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
      this.selectedYear = Number(year);
      return year;
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

  setYears(): void {
    this.selectedYear = Number(this.expenseList.responseExpenses.currentDate.substring(0, 4));
    const date = this.expenseList.responseExpenses.currentDate;
    let dateNumber = Number(date.substring(0, 4));
    let step;
    this.years = [2021];
    for (step = 0; step < 5; step++) {
      dateNumber -= 1;
      this.years.push(dateNumber);
    }
  }


  dateSubmit(): void {
    const month: any = {
      month: this.formDate.value.month,
      year: this.formDate.value.year
    };

    let monthNumber: string;
    switch (month.month) {
      case 'January':
        monthNumber = '01';
        break;
      case 'February':
        monthNumber = '02';
        break;
      case 'March':
        monthNumber = '03';
        break;
      case 'April':
        monthNumber = '04';
        break;
      case 'May':
        monthNumber = '05';
        break;
      case 'June':
        monthNumber = '06';
        break;
      case 'July':
        monthNumber = '07';
        break;
      case 'August':
        monthNumber = '08';
        break;
      case 'September':
        monthNumber = '09';
        break;
      case 'October':
        monthNumber = '10';
        break;
      case 'November':
        monthNumber = '11';
        break;
      case 'December':
        monthNumber = '12';
        break;
      default:
        monthNumber = '01';
    }
    const year = month.year;

    this.expenseRequest.getCriteriaRequest.requestedDate = year + '-' + monthNumber + '-01';
    console.log(this.expenseRequest.getCriteriaRequest.requestedDate);

    this.flagEditDateActive = false;

    this.expenseList.getAllExpenses();

  }

  setEditDateActive(): void {
    this.setYears();
    this.flagEditDateActive = true;
  }

  setEditDateInactive(): void {
    this.flagEditDateActive = false;
  }

  getYearNumber(): number {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      return Number(this.expenseList.responseExpenses.requestedDate.substring(0, 4));
    }
    return 2021;
  }
}
