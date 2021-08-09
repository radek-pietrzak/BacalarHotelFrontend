import {Component, OnInit} from '@angular/core';
import {ExpenseCriteriaRequestService} from '../services/expense-criteria-request.service';
import {ExpenseListComponent} from '../expense-list/expense-list.component';

@Component({
  selector: 'app-expense-page-criteria',
  templateUrl: './expense-page-criteria.component.html',
  styleUrls: ['../expense.css']
})
export class ExpensePageCriteriaComponent implements OnInit {

  constructor(expenseList: ExpenseListComponent, expenseRequest: ExpenseCriteriaRequestService) {
    this.expenseList = expenseList;
    this.expenseRequest = expenseRequest;
  }

  private expenseList: ExpenseListComponent;
  private expenseRequest: ExpenseCriteriaRequestService;

  pageSizeBtnActive = 0;

  ngOnInit(): void {
  }

  previousPage(): void {
    if (this.expenseRequest.getCriteriaRequest.page.number > 0) {
      this.expenseRequest.getCriteriaRequest.page.number -= 1;
      this.expenseList.getAllExpenses();
    }
  }

  nextPage(): void {
    if (this.expenseList.responseExpenses.hasNextPage) {
      this.expenseRequest.getCriteriaRequest.page.number += 1;
      this.expenseList.getAllExpenses();
    }
  }

  getTotalPages(): number {
    return this.expenseList.responseExpenses.totalPages;
  }

  getPageNumber(): number {
    return this.expenseRequest.getCriteriaRequest.page.number + 1;
  }

  setPageSize10(): void {
    this.expenseRequest.getCriteriaRequest.page.size = 10;
    this.expenseRequest.getCriteriaRequest.page.number = 0;
    this.expenseList.getAllExpenses();
    this.pageSizeBtnActive = 10;
  }

  setPageSize20(): void {
    this.expenseRequest.getCriteriaRequest.page.size = 20;
    this.expenseRequest.getCriteriaRequest.page.number = 0;
    this.expenseList.getAllExpenses();
    this.pageSizeBtnActive = 20;
  }

  setPageSize50(): void {
    this.expenseRequest.getCriteriaRequest.page.size = 50;
    this.expenseRequest.getCriteriaRequest.page.number = 0;
    this.expenseList.getAllExpenses();
    this.pageSizeBtnActive = 50;
  }
}
