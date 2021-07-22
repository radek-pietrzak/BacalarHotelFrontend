import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../services/expense.service';
import {ExpenseCriteriaRequest} from '../model/expense-criteria-request';
import {Page} from '../model/page';
import {Expense} from '../model/expense';
import {SearchSortCriterion} from '../model/search-sort-criterion';
import {SearchSpecCriterion} from '../model/search-spec-criterion';
import {ResponseExpenses} from '../model/response-expenses';
import {ExpenseModification} from '../model/expense-modification';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExpenseRequest} from '../model/expense-request';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-expense-post',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  providers: [ExpenseService, DatePipe]
})
export class ExpenseListComponent implements OnInit {
  datePipeString: string;

  constructor(private datePipe: DatePipe, private expenseService: ExpenseService) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  expenses: Expense[] = [];
  expenseAddForm: FormGroup;

  responseExpenses: ResponseExpenses = {
    page: 0,
    hasNextPage: false,
    totalPages: 0,
    expenses: this.expenses
  };


  private page: Page = {
    number: 0,
    size: 10
  };

  searchSortCriterion: SearchSortCriterion = {
    key: 'id',
    operation: 'DESC'
  };

  private searchSortCriteria: SearchSortCriterion[] = [this.searchSortCriterion];


  private searchSpecCriterion: SearchSpecCriterion = {
    key: 'description',
    operation: 'CONTAINS',
    value: ''
  };

  private searchSpecCriteria: SearchSpecCriterion [] = [this.searchSpecCriterion];

  private criteriaRequest: ExpenseCriteriaRequest = {
    page: this.page,
    searchSortCriteria: this.searchSortCriteria,
    searchSpecCriteria: this.searchSpecCriteria
  };


  ngOnInit(): void {
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);

    this.expenseAddForm = new FormGroup({
      user: new FormControl('Radek', Validators.required),
      amount: new FormControl('0', Validators.required),
      currency: new FormControl('PLN', Validators.required),
      description: new FormControl('Some description', Validators.required),
      payDate: new FormControl(this.datePipeString, Validators.required),
      payMethodName: new FormControl('Credit card', Validators.required),
      categoryName: new FormControl('Some category', Validators.required),
    });
  }

  onSubmit(): void {
    const expenseModification: ExpenseModification = {
      user: this.expenseAddForm.value.user,
      amount: this.expenseAddForm.value.amount,
      currency: this.expenseAddForm.value.currency,
      description: this.expenseAddForm.value.description,
      payDate: this.expenseAddForm.value.payDate,
      payMethodName: this.expenseAddForm.value.payMethodName,
      categoryName: this.expenseAddForm.value.categoryName,
    };

    const expenseRequest: ExpenseRequest = {
      expense: expenseModification
    };

    this.expenseService
      .addExpense(expenseRequest)
      .subscribe(() => {
        alert('Expense added');
        window.location.reload();
      });
  }

  getDate(): Date {
    return new Date();
  }

}
