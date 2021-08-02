import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../services/expense.service';
import {Expense} from '../../model/expense';
import {ResponseExpenses} from '../../model/response-expenses';
import {ExpenseModification} from '../../model/expense-modification';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExpenseRequest} from '../../model/expense-request';
import {DatePipe} from '@angular/common';
import {ExpenseCriteriaRequestService} from '../services/expense-criteria-request.service';
import {ExpenseSortCriteriaService} from '../services/expense-sort-criteria.service';
import {ExpensePageCriteriaService} from '../services/expense-page-criteria.service';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';

@Component({
  selector: 'app-expense-post',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  providers: [ExpenseService,
    DatePipe,
    ExpenseCriteriaRequestService,
    ExpenseSortCriteriaService]
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

  edit = false;

  searchForm: FormGroup;

  // fromAmountForm: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private expenseService: ExpenseService,
    private expenseCriteriaRequestService: ExpenseCriteriaRequestService,
    private expenseSortCriteriaService: ExpenseSortCriteriaService,
    private expensePageCriteriaService: ExpensePageCriteriaService) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.searchFormGroup();
    this.getAllExpenses();
    this.expenseAddFormGroup();
  }

  getPageNumber(): number {
    return this.expensePageCriteriaService.getPageNumber();
  }

  previousPage(): void {
    this.expensePageCriteriaService.previousPage();
    this.getAllExpenses();
  }

  nextPage(): void {
    if (this.responseExpenses.hasNextPage) {
      this.expensePageCriteriaService.nextPage();
    }
    this.getAllExpenses();
  }

  setPageSize10(): void {
    this.expensePageCriteriaService.setPageSize10();
    this.getAllExpenses();
  }

  setPageSize20(): void {
    this.expensePageCriteriaService.setPageSize20();
    this.getAllExpenses();
  }

  setPageSize50(): void {
    this.expensePageCriteriaService.setPageSize50();
    this.getAllExpenses();
  }

  searchFormGroup(): void {
    this.searchForm = new FormGroup({
      search: new FormGroup({
        key: new FormControl(null, Validators.required),
        operation: new FormControl('CONTAINS', Validators.required),
        content: new FormControl(null, Validators.required)
      }),
      fromAmount: new FormGroup({
        key: new FormControl(null, Validators.required),
        operation: new FormControl('GREATER', Validators.required),
        content: new FormControl(null, Validators.required)
      }),
      toAmount: new FormGroup({
        key: new FormControl(null, Validators.required),
        operation: new FormControl('LESS', Validators.required),
        content: new FormControl(null, Validators.required)
      }),
      fromPayDate: new FormGroup({
        key: new FormControl(null, Validators.required),
        operation: new FormControl('GREATER', Validators.required),
        content: new FormControl(null, Validators.required)
      }),
      toPayDate: new FormGroup({
        key: new FormControl(null, Validators.required),
        operation: new FormControl('LESS', Validators.required),
        content: new FormControl(null, Validators.required)
      })
    });
  }

  get searchContent(): any {
    return this.searchForm.get('search.content');
  }

  get fromAmountContent(): any {
    return this.searchForm.get('fromAmount.content');
  }

  get toAmountContent(): any {
    return this.searchForm.get('toAmount.content');
  }

  get fromPayDateContent(): any {
    return this.searchForm.get('fromPayDate.content');
  }

  get toPayDateContent(): any {
    return this.searchForm.get('toPayDate.content');
  }

  setNewSearchCriteria(): void {
    const searchCriterion: SearchSpecCriterion = {
      key: '',
      operation: 'CONTAINS',
      content: this.searchContent.value
    };

    const fromAmountCriterion: SearchSpecCriterion = {
      key: 'amount',
      operation: 'GREATER',
      content: this.fromAmountContent.value
    };

    const toAmountCriterion: SearchSpecCriterion = {
      key: 'amount',
      operation: 'LESS',
      content: this.toAmountContent.value
    };

    const fromPayDateCriterion: SearchSpecCriterion = {
      key: 'payDate',
      operation: 'GREATER',
      content: this.fromPayDateContent.value
    };

    const toPayDateCriterion: SearchSpecCriterion = {
      key: 'payDate',
      operation: 'LESS',
      content: this.toPayDateContent.value
    };

    this.expenseCriteriaRequestService.setCriteriaRequestBySpec(
      searchCriterion, fromAmountCriterion, toAmountCriterion, fromPayDateCriterion, toPayDateCriterion);

    this.getAllExpenses();
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

  getAllExpenses(): void {
    this.expenseService.getAllExpenses(this.expenseCriteriaRequestService.getCriteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

  setDefaultSort(): void {
    this.expenseSortCriteriaService.setDefaultSort();
    this.getAllExpenses();
  }

  setUserSortASC(): void {
    this.expenseSortCriteriaService.setUserSortASC();
    this.getAllExpenses();
  }

  setUserSortDESC(): void {
    this.expenseSortCriteriaService.setUserSortDESC();
    this.getAllExpenses();
  }

  setAmountSortASC(): void {
    this.expenseSortCriteriaService.setAmountSortASC();
    this.getAllExpenses();
  }

  setAmountSortDESC(): void {
    this.expenseSortCriteriaService.setAmountSortDESC();
    this.getAllExpenses();
  }

  setCurrencySortASC(): void {
    this.expenseSortCriteriaService.setCurrencySortASC();
    this.getAllExpenses();
  }

  setCurrencySortDESC(): void {
    this.expenseSortCriteriaService.setCurrencySortDESC();
    this.getAllExpenses();
  }

  setDescriptionSortASC(): void {
    this.expenseSortCriteriaService.setDescriptionSortASC();
    this.getAllExpenses();
  }

  setDescriptionSortDESC(): void {
    this.expenseSortCriteriaService.setDescriptionSortDESC();
    this.getAllExpenses();
  }

  setCategorySortASC(): void {
    this.expenseSortCriteriaService.setCategorySortASC();
    this.getAllExpenses();
  }

  setCategorySortDESC(): void {
    this.expenseSortCriteriaService.setCategorySortDESC();
    this.getAllExpenses();
  }

  setPayMethodSortASC(): void {
    this.expenseSortCriteriaService.setPayMethodSortASC();
    this.getAllExpenses();
  }

  setPayMethodSortDESC(): void {
    this.expenseSortCriteriaService.setPayMethodSortDESC();
    this.getAllExpenses();
  }

  setPayDateSortASC(): void {
    this.expenseSortCriteriaService.setPayDateSortASC();
    this.getAllExpenses();
  }

  setPayDateSortDESC(): void {
    this.expenseSortCriteriaService.setPayDateSortDESC();
    this.getAllExpenses();
  }

  showDefaultSortUserBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortUserBtn();
  }

  showUserSortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showUserSortASCBtn();
  }

  showUserSortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showUserSortDESCBtn();
  }

  showDefaultSortAmountBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortAmountBtn();
  }

  showAmountSortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showAmountSortASCBtn();
  }

  showAmountSortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showAmountSortDESCBtn();
  }

  showDefaultSortCurrencyBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortCurrencyBtn();
  }

  showCurrencySortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showCurrencySortASCBtn();
  }

  showCurrencySortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showCurrencySortDESCBtn();
  }

  showDefaultSortDescriptionBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortDescriptionBtn();
  }

  showDescriptionSortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showDescriptionSortASCBtn();
  }

  showDescriptionSortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showDescriptionSortDESCBtn();
  }

  showDefaultSortCategoryBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortCategoryBtn();
  }

  showCategorySortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showCategorySortASCBtn();
  }

  showCategorySortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showCategorySortDESCBtn();
  }

  showDefaultSortPayMethodBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortPayMethodBtn();
  }

  showPayMethodSortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showPayMethodSortASCBtn();
  }

  showPayMethodSortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showPayMethodSortDESCBtn();
  }

  showDefaultSortPayDateBtn(): boolean {
    return this.expenseSortCriteriaService.showDefaultSortPayDateBtn();
  }

  showPayDateSortASCBtn(): boolean {
    return this.expenseSortCriteriaService.showPayDateSortASCBtn();
  }

  showPayDateSortDESCBtn(): boolean {
    return this.expenseSortCriteriaService.showPayDateSortDESCBtn();
  }

}
