import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../services/expense.service';
import {ExpenseCriteriaRequest} from '../model/expense-criteria-request';
import {Page} from '../model/page';
import {Expense} from '../model/expense';
import {SearchSortCriterion} from '../model/search-sort-criterion';
import {SearchSpecCriterion} from '../model/search-spec-criterion';
import {ResponseExpenses} from '../model/response-expenses';

@Component({
  selector: 'app-expense-list-post',
  templateUrl: './expense-list-post.component.html',
  providers: [ExpenseService]
})
export class ExpenseListPostComponent implements OnInit {
  expenses: Expense[] = [];

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

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.findAllPost(this.criteriaRequest)
      .subscribe(response => this.responseExpenses = response);
  }

}
