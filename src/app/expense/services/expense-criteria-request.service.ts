import {Injectable} from '@angular/core';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';
import {ExpenseCriteriaRequest} from '../../model/expense-criteria-request';
import {ExpenseSortCriteriaService} from './expense-sort-criteria.service';
import {ExpensePageCriteriaService} from './expense-page-criteria.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCriteriaRequestService {

  constructor(private expenseSortCriteriaService: ExpenseSortCriteriaService,
              private expensePageCriteriaService: ExpensePageCriteriaService) {
  }

  private searchSpecCriterion: SearchSpecCriterion = {
    operation: 'CONTAINS',
    content: ''
  };

  private searchSpecCriteria: SearchSpecCriterion [] = [this.searchSpecCriterion];

  private expenseCriteriaRequest: ExpenseCriteriaRequest = {
    page: this.expensePageCriteriaService.page,
    searchSortCriteria: this.expenseSortCriteriaService.searchSortCriteria,
    searchSpecCriteria: this.searchSpecCriteria
  };

  get criteriaRequest(): ExpenseCriteriaRequest {
    return this.expenseCriteriaRequest;
  }


}
