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
  expenseId: string;
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
    operation: 'CONTAINS',
    content: ''
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

  searchForm: FormGroup;


  constructor(private datePipe: DatePipe, private expenseService: ExpenseService) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }


  ngOnInit(): void {
    this.getAllExpenses();
    this.expenseAddFormGroup();
    this.searchFormGroup();
  }

  addExpense(): void {
    const expenseModification: ExpenseModification = {
      user: this.expenseEditForm.value.user,
      amount: this.expenseEditForm.value.amount,
      currency: this.expenseEditForm.value.currency,
      description: this.expenseEditForm.value.description,
      payDate: this.expenseEditForm.value.payDate,
      payMethod: this.expenseEditForm.value.payMethod,
      expenseCategory: this.expenseEditForm.value.expenseCategory,
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
      id: this.expenseId,
      user: this.expenseEditForm.value.user,
      amount: this.expenseEditForm.value.amount,
      currency: this.expenseEditForm.value.currency,
      description: this.expenseEditForm.value.description,
      payDate: this.expenseEditForm.value.payDate,
      payMethod: this.expenseEditForm.value.payMethod,
      expenseCategory: this.expenseEditForm.value.expenseCategory,
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

  searchNewCriteria(): void {
    this.searchSpecCriterion = {
      key: null,
      operation: 'CONTAINS',
      content: this.searchForm.value.content
    };

    this.searchSpecCriteria = [this.searchSpecCriterion];

    this.criteriaRequest = {
      page: this.page,
      searchSortCriteria: this.searchSortCriteria,
      searchSpecCriteria: this.searchSpecCriteria
    };

    this.expenseService.getAllExpenses(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  previousPage(): void {
    if (this.page.number > 0) {
      this.page.number = this.page.number - 1;
    }
    this.getAllExpenses();
  }

  nextPage(): void {
    if (this.responseExpenses.hasNextPage) {
      this.page.number = this.page.number + 1;
    }
    this.getAllExpenses();
  }

  setPageSize10(): void {
    this.page.size = 10;
    this.page.number = 0;
    this.getAllExpenses();
  }

  setPageSize20(): void {
    this.page.size = 20;
    this.page.number = 0;
    this.getAllExpenses();
  }

  setPageSize50(): void {
    this.page.size = 50;
    this.page.number = 0;
    this.getAllExpenses();
  }

  deleteExpense(id: string): void {
    if (confirm('Are you sure to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe();
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

  setEditOn(id: string): void {
    this.expenseId = id;
    this.expenseService.getExpense(id).subscribe(response => this.expense = response);

    setTimeout(() => this.expenseUpdateFormGroup(), 1000);

    this.edit = true;

  }

  setEditOff(): void {
    setTimeout(() => this.expenseAddFormGroup(), 1000);
    this.edit = false;
    window.location.reload();

  }

  setEditOffWithUpdate(): void {
    this.updateExpense();
    setTimeout(() => this.expenseAddFormGroup(), 1000);
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
      payMethod: new FormControl(this.expense.payMethod, Validators.required),
      expenseCategory: new FormControl(this.expense.expenseCategory, Validators.required),
    });
  }

  expenseAddFormGroup(): void {
    this.expenseEditForm = new FormGroup({
      user: new FormControl('Radek', Validators.required),
      amount: new FormControl('0', Validators.required),
      currency: new FormControl('PLN', Validators.required),
      description: new FormControl('Some description', Validators.required),
      payDate: new FormControl(this.datePipeString, Validators.required),
      payMethod: new FormControl('Credit card', Validators.required),
      expenseCategory: new FormControl('Some category', Validators.required),
    });
  }

  searchFormGroup(): void {
    this.searchForm = new FormGroup({
      key: new FormControl(null, Validators.required),
      operation: new FormControl('CONTAINS', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  private getAllExpenses(): void {
    this.expenseService.getAllExpenses(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
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

  setUserSortASC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = true;
    this.flagDefaultSort = false;

  }

  setUserSortDESC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setDefaultSort(): void {
    this.searchSortCriterion.key = 'id';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
  }

  setAmountSortASC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setAmountSortDESC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCurrencySortASC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCurrencySortDESC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setDescriptionSortASC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setDescriptionSortDESC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCategorySortASC(): void {
    this.searchSortCriterion.key = 'expenseCategory';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCategorySortDESC(): void {
    this.searchSortCriterion.key = 'expenseCategory';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayMethodSortASC(): void {
    this.searchSortCriterion.key = 'payMethod';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayMethodSortDESC(): void {
    this.searchSortCriterion.key = 'payMethod';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayDateSortASC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'ASC';

    this.getAllExpenses();

    this.setSpecSortFalse();
    this.flagPayDateSortKey = true;
    this.flagPayDateSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayDateSortDESC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'DESC';

    this.getAllExpenses();

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
