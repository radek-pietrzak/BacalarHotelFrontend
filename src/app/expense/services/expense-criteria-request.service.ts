import {Injectable} from '@angular/core';
import {ExpenseCriteriaRequest} from '../../model/expense-criteria-request';
import {ExpenseSortCriteriaService} from './expense-sort-criteria.service';
import {ExpensePageCriteriaService} from './expense-page-criteria.service';
import {ExpenseSpecCriteriaService} from './expense-spec-criteria.service';
import {ExpenseSpecCriteriaComponent} from '../expense-spec-criteria/expense-spec-criteria.component';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCriteriaRequestService {

  constructor(private expenseSortCriteriaService: ExpenseSortCriteriaService,
              private expensePageCriteriaService: ExpensePageCriteriaService,
              private expenseSpecCriteriaService: ExpenseSpecCriteriaService,
              private expenseSpecCriteriaComponent: ExpenseSpecCriteriaComponent) {
  }

  private criteriaRequest: ExpenseCriteriaRequest = {
    page: this.expensePageCriteriaService.page,
    searchSortCriteria: this.expenseSortCriteriaService.searchSortCriteria,
    searchSpecCriteria: this.expenseSpecCriteriaComponent.searchSpecCriteria,
  };

  get getCriteriaRequest(): ExpenseCriteriaRequest {
    return this.criteriaRequest;
  }

  setCriteriaRequestBySpec(searchCriterion: SearchSpecCriterion,
                           fromAmountCriterion: SearchSpecCriterion,
                           toAmountCriterion: SearchSpecCriterion,
                           fromPayDateCriterion: SearchSpecCriterion,
                           toPayDateCriterion: SearchSpecCriterion): void {
    this.criteriaRequest.searchSpecCriteria =
      [searchCriterion, fromAmountCriterion, toAmountCriterion, fromPayDateCriterion, toPayDateCriterion];
  }

}
