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

  private monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  monthNameList: string[];
  private requestedMonthName: string;
  yearList: number[];
  private requestedYear: number;
  flagEditDateActive = false;
  formDate: FormGroup;

  ngOnInit(): void {
    this.requestedMonthName = this.getMonthName();
    this.requestedYear = this.getRequestedYear();
    this.formDateGroup();
  }

  formDateGroup(): void {
    this.formDate = new FormGroup({
      month: new FormControl(this.requestedMonthName, Validators.required),
      year: new FormControl(this.requestedYear, Validators.required)
    });
  }

  getYear(): string {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      const year = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
      this.requestedYear = Number(year);
      this.formDateGroup();
      return year;
    }
    return 'Can\'t read the year';
  }

  getMonthName(): string {
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
      this.requestedMonthName = month;
      this.formDateGroup();
      return month;
    }
    return 'Can\'t read the month';
  }

  previousMonth(): void {
    const monthString = this.expenseList.responseExpenses.requestedDate.substring(5, 7);
    let monthNumber = Number(monthString);
    const yearString = this.expenseList.responseExpenses.requestedDate.substring(0, 4);
    let yearNumber = Number(yearString);
    monthNumber -= 1;
    if (monthNumber < 1) {
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
    monthNumber += 1;
    if (monthNumber > 12) {
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

  createOptionLists(): void {
    const date = this.expenseList.responseExpenses.currentDate;
    let yearNumber = Number(date.substring(0, 4));
    this.yearList = [this.getRequestedYear()];
    if (yearNumber !== this.getRequestedYear()) {
      this.yearList.push(yearNumber);
    }
    for (let i = 0; i < 5; i++) {
      yearNumber -= 1;
      if (yearNumber !== this.getRequestedYear()) {
        this.yearList.push(yearNumber);
      }
    }

    this.monthNameList = [this.getMonthName()];
    for (const element of this.monthNames) {
      if (this.getMonthName() !== element) {
        this.monthNameList.push(element);
      }
    }

    this.requestedYear = this.getRequestedYear();
    this.requestedMonthName = this.getMonthName();
    this.flagEditDateActive = true;
    this.formDateGroup();
  }

  dateSubmit(): void {
    const month: any = {
      month: this.formDate.value.month,
      year: this.formDate.value.year
    };

    this.getMonthStringNumber(month);

    const year = month.year;

    this.expenseRequest.getCriteriaRequest.requestedDate = year + '-' + this.getMonthStringNumber(month) + '-01';

    this.flagEditDateActive = false;

    this.expenseList.getAllExpenses();

  }

  getMonthStringNumber(month: any): string {
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

    return monthNumber;
  }

  setEditDateInactive(): void {
    this.flagEditDateActive = false;
  }

  getRequestedYear(): number {
    if (null != this.expenseList.responseExpenses.requestedDate) {
      return Number(this.expenseList.responseExpenses.requestedDate.substring(0, 4));
    }
    return 2021;
  }

  changeToCurrentMonth(): void {
    this.setEditDateInactive();
    this.expenseRequest.getCriteriaRequest.requestedDate = this.expenseList.responseExpenses.currentDate;
    this.expenseList.getAllExpenses();
  }
}
