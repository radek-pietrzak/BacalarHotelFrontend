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
  private expense: Expense;
  datePipeString: string;

  private expenses: Expense[] = [];
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

  private searchSortCriterion: SearchSortCriterion = {
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

  private flagDefaultSort = true;
  private flagUserSortKey = false;
  private flagUserSortOpASC = false;
  private flagAmountSortKey = false;
  private flagAmountSortOpASC = false;
  private flagCurrencySortKey = false;
  private flagCurrencySortOpASC = false;
  private flagDescriptionSortKey = false;
  private flagDescriptionSortOpASC = false;
  private flagCategorySortKey = false;
  private flagCategorySortOpASC = false;
  private flagPayMethodSortKey = false;
  private flagPayMethodSortOpASC = false;
  private flagPayDateSortKey = false;
  private flagPayDateSortOpASC = false;


  constructor(private datePipe: DatePipe, private expenseService: ExpenseService) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }


  ngOnInit(): void {
    this.getAllPosts();
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

    this.expenseService
      .editExpense(expenseRequest)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  previousPage(): void {
    if (this.page.number > 0) {
      this.page.number = this.page.number - 1;
    }
    this.getAllPosts();
  }

  nextPage(): void {
    if (this.responseExpenses.hasNextPage) {
      this.page.number = this.page.number + 1;
    }
    this.getAllPosts();
  }

  setPageSize10(): void {
    this.page.size = 10;
    this.page.number = 0;
    this.getAllPosts();
  }

  setPageSize20(): void {
    this.page.size = 20;
    this.page.number = 0;
    this.getAllPosts();
  }

  setPageSize50(): void {
    this.page.size = 50;
    this.page.number = 0;
    this.getAllPosts();
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure to delete this expense?')) {
      this.expenseService.deleteExpense(id.toString()).subscribe();
      window.location.reload();
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

  private getAllPosts(): void {
    this.expenseService.getAllPosts(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  setUserSortASC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = true;
    this.flagDefaultSort = false;

  }

  setUserSortDESC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setDefaultSort(): void {
    this.searchSortCriterion.key = 'id';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
  }

  setSpecSortFalse(): void {
    this.flagUserSortKey = false;
    this.flagUserSortOpASC = false;
    this.flagAmountSortKey = false;
    this.flagAmountSortOpASC = false;
    this.flagCurrencySortKey = false;
    this.flagCurrencySortOpASC = false;
    this.flagDescriptionSortKey = false;
    this.flagDescriptionSortOpASC = false;
    this.flagCategorySortKey = false;
    this.flagCategorySortOpASC = false;
    this.flagPayMethodSortKey = false;
    this.flagPayMethodSortOpASC = false;
    this.flagPayDateSortKey = false;
    this.flagPayDateSortOpASC = false;
  }

  setAmountSortASC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setAmountSortDESC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCurrencySortASC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCurrencySortDESC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setDescriptionSortASC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setDescriptionSortDESC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCategorySortASC(): void {
    this.searchSortCriterion.key = 'expenseCategory.categoryName';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCategorySortDESC(): void {
    this.searchSortCriterion.key = 'expenseCategory.categoryName';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayMethodSortASC(): void {
    this.searchSortCriterion.key = 'payMethod.payMethodName';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayMethodSortDESC(): void {
    this.searchSortCriterion.key = 'payMethod.payMethodName';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayDateSortASC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagPayDateSortKey = true;
    this.flagPayDateSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayDateSortDESC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllPosts();

    this.setSpecSortFalse();
    this.flagPayDateSortKey = true;
    this.flagPayDateSortOpASC = false;
    this.flagDefaultSort = false;
  }

  showDefaultSortUserBtn(): boolean {
    return this.flagUserSortKey === false && this.flagUserSortOpASC === false;
  }

  showUserSortASCBtn(): boolean {
    return this.flagUserSortKey === true && this.flagUserSortOpASC === true;
  }

  showUserSortDESCBtn(): boolean {
    return this.flagUserSortKey === true && this.flagUserSortOpASC === false;
  }

  showDefaultSortAmountBtn(): boolean {
    return this.flagAmountSortKey === false && this.flagAmountSortOpASC === false;
  }

  showAmountSortASCBtn(): boolean {
    return this.flagAmountSortKey === true && this.flagAmountSortOpASC === true;
  }

  showAmountSortDESCBtn(): boolean {
    return this.flagAmountSortKey === true && this.flagAmountSortOpASC === false;
  }

  showDefaultSortCurrencyBtn(): boolean {
    return this.flagCurrencySortKey === false && this.flagCurrencySortOpASC === false;
  }

  showCurrencySortASCBtn(): boolean {
    return this.flagCurrencySortKey === true && this.flagCurrencySortOpASC === true;
  }

  showCurrencySortDESCBtn(): boolean {
    return this.flagCurrencySortKey === true && this.flagCurrencySortOpASC === false;
  }

  showDefaultSortDescriptionBtn(): boolean {
    return this.flagDescriptionSortKey === false && this.flagDescriptionSortOpASC === false;
  }

  showDescriptionSortASCBtn(): boolean {
    return this.flagDescriptionSortKey === true && this.flagDescriptionSortOpASC === true;
  }

  showDescriptionSortDESCBtn(): boolean {
    return this.flagDescriptionSortKey === true && this.flagDescriptionSortOpASC === false;
  }

  showDefaultSortCategoryBtn(): boolean {
    return this.flagCategorySortKey === false && this.flagCategorySortOpASC === false;
  }

  showCategorySortASCBtn(): boolean {
    return this.flagCategorySortKey === true && this.flagCategorySortOpASC === true;
  }

  showCategorySortDESCBtn(): boolean {
    return this.flagCategorySortKey === true && this.flagCategorySortOpASC === false;
  }

  showDefaultSortPayMethodBtn(): boolean {
    return this.flagPayMethodSortKey === false && this.flagPayMethodSortOpASC === false;
  }

  showPayMethodSortASCBtn(): boolean {
    return this.flagPayMethodSortKey === true && this.flagPayMethodSortOpASC === true;
  }

  showPayMethodSortDESCBtn(): boolean {
    return this.flagPayMethodSortKey === true && this.flagPayMethodSortOpASC === false;
  }

  showDefaultSortPayDateBtn(): boolean {
    return this.flagPayDateSortKey === false && this.flagPayDateSortOpASC === false;
  }

  showPayDateSortASCBtn(): boolean {
    return this.flagPayDateSortKey === true && this.flagPayDateSortOpASC === true;
  }

  showPayDateSortDESCBtn(): boolean {
    return this.flagPayDateSortKey === true && this.flagPayDateSortOpASC === false;
  }

}
