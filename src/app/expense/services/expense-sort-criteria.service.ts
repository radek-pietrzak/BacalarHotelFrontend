import {Injectable} from '@angular/core';
import {SearchSortCriterion} from '../../model/search-sort-criterion';

@Injectable({
  providedIn: 'root'
})
export class ExpenseSortCriteriaService {

  constructor() {
  }

  private searchSortCriterion: SearchSortCriterion = {
    key: 'id',
    operation: 'DESC'
  };

  expenseSearchSortCriteria: SearchSortCriterion[] = [this.searchSortCriterion];

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

  get searchSortCriteria(): SearchSortCriterion [] {
    return this.expenseSearchSortCriteria;
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

  setDefaultSort(): void {
    this.searchSortCriterion.key = 'id';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
  }

  setUserSortASC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setUserSortDESC(): void {
    this.searchSortCriterion.key = 'user';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagUserSortKey = true;
    this.flagUserSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setAmountSortASC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setAmountSortDESC(): void {
    this.searchSortCriterion.key = 'amount';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagAmountSortKey = true;
    this.flagAmountSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCurrencySortASC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCurrencySortDESC(): void {
    this.searchSortCriterion.key = 'currency';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagCurrencySortKey = true;
    this.flagCurrencySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setDescriptionSortASC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setDescriptionSortDESC(): void {
    this.searchSortCriterion.key = 'description';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagDescriptionSortKey = true;
    this.flagDescriptionSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setCategorySortASC(): void {
    this.searchSortCriterion.key = 'expenseCategory.categoryName';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = true;
    this.flagDefaultSort = false;
  }

  setCategorySortDESC(): void {
    this.searchSortCriterion.key = 'expenseCategory.categoryName';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagCategorySortKey = true;
    this.flagCategorySortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayMethodSortASC(): void {
    this.searchSortCriterion.key = 'payMethod.payMethodName';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayMethodSortDESC(): void {
    this.searchSortCriterion.key = 'payMethod.payMethodName';
    this.searchSortCriterion.operation = 'DESC';
    this.setSpecSortFalse();
    this.flagPayMethodSortKey = true;
    this.flagPayMethodSortOpASC = false;
    this.flagDefaultSort = false;
  }

  setPayDateSortASC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'ASC';
    this.setSpecSortFalse();
    this.flagPayDateSortKey = true;
    this.flagPayDateSortOpASC = true;
    this.flagDefaultSort = false;
  }

  setPayDateSortDESC(): void {
    this.searchSortCriterion.key = 'payDate';
    this.searchSortCriterion.operation = 'DESC';
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
