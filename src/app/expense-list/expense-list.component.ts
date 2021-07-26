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
  private id: string;
  expenseId: number;
  expense: Expense;
  totalPages: number;

  constructor(private datePipe: DatePipe, private expenseService: ExpenseService) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  datePipeString: string;

  expenses: Expense[] = [];
  expenseEditForm: FormGroup;

  responseExpenses: ResponseExpenses = {
    page: 0,
    hasNextPage: false,
    totalPages: 0,
    expenses: this.expenses
  };


  page: Page = {
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
  edit = false;


  ngOnInit(): void {
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);

    this.expenseAddFormGroup();

  }

  addExpense(): void {
    const expenseModification: ExpenseModification = {
      user: this.expenseEditForm.value.user,
      amount: this.expenseEditForm.value.amount,
      currency: this.expenseEditForm.value.currency,
      description: this.expenseEditForm.value.description,
      payDate: this.expenseEditForm.value.payDate,
      payMethodName: this.expenseEditForm.value.payMethodName,
      categoryName: this.expenseEditForm.value.categoryName,
    };

    const expenseRequest: ExpenseRequest = {
      expense: expenseModification
    };

    if (confirm('Are you sure to add this expense?')) {
      this.expenseService
        .editExpense(expenseRequest)
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }

  updateExpense(): void {
    const expenseModification: ExpenseModification = {
      id: this.expenseId.toString(),
      user: this.expenseEditForm.value.user,
      amount: this.expenseEditForm.value.amount,
      currency: this.expenseEditForm.value.currency,
      description: this.expenseEditForm.value.description,
      payDate: this.expenseEditForm.value.payDate,
      payMethodName: this.expenseEditForm.value.payMethodName,
      categoryName: this.expenseEditForm.value.categoryName,
    };

    const expenseRequest: ExpenseRequest = {
      expense: expenseModification
    };

    if (confirm('Are you sure to update this expense?')) {
      this.expenseService
        .editExpense(expenseRequest)
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }

  previousPage(): void {
    if (this.page.number > 0) {
      this.page.number = this.page.number - 1;
    }
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  nextPage(): void {
    if (this.responseExpenses.hasNextPage) {
      this.page.number = this.page.number + 1;
    }
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  setPageSize10(): void {
    this.page.size = 10;
    this.page.number = 0;
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  setPageSize20(): void {
    this.page.size = 20;
    this.page.number = 0;
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  setPageSize50(): void {
    this.page.size = 50;
    this.page.number = 0;
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure to delete this expense?')) {
      this.expenseService.deleteExpense(id.toString()).subscribe();
      this.ngOnInit();
    }
  }

  saveId(id: number): void {
    let stringId: string;
    stringId = id.toString();
    this.id = stringId;
  }

  public getId(): string {
    return this.id;
  }

  setEditOn(id: number): void {
    this.expenseId = id;
    this.expenseService.getExpense(id.toString()).subscribe(response => this.expense = response);

    setTimeout(() => this.expenseUpdateFormGroup(), 50);
    this.edit = true;

  }

  setEditOff(): void {
    setTimeout(() => this.expenseAddFormGroup(), 50);
    this.edit = false;
    this.ngOnInit();

  }

  setEditOffWithUpdate(): void {
    this.updateExpense();
    setTimeout(() => this.expenseAddFormGroup(), 50);
    this.edit = false;
    this.ngOnInit();

  }

  expenseUpdateFormGroup(): void {
    this.expenseEditForm = new FormGroup({
      user: new FormControl(this.expense.user, Validators.required),
      amount: new FormControl(this.expense.amount, Validators.required),
      currency: new FormControl(this.expense.currency, Validators.required),
      description: new FormControl(this.expense.description, Validators.required),
      payDate: new FormControl(this.expense.payDate, Validators.required),
      payMethodName: new FormControl(this.expense.payMethod.payMethodName, Validators.required),
      categoryName: new FormControl(this.expense.expenseCategory.categoryName, Validators.required),
    });
  }

  expenseAddFormGroup(): void {
    this.expenseEditForm = new FormGroup({
      user: new FormControl('Radek', Validators.required),
      amount: new FormControl('0', Validators.required),
      currency: new FormControl('PLN', Validators.required),
      description: new FormControl('Some description', Validators.required),
      payDate: new FormControl(this.datePipeString, Validators.required),
      payMethodName: new FormControl('Credit card', Validators.required),
      categoryName: new FormControl('Some category', Validators.required),
    });
  }

}
