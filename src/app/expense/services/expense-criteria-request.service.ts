import {Injectable} from '@angular/core';
import {ExpenseCriteriaRequest} from '../../model/expense-criteria-request';
import {ExpenseSortCriteriaService} from './expense-sort-criteria.service';
import {ExpenseSpecCriteriaService} from './expense-spec-criteria.service';
import {ExpenseSpecCriteriaComponent} from '../expense-spec-criteria/expense-spec-criteria.component';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';
import {Page} from '../../model/page';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCriteriaRequestService {

  constructor(private expenseSortCriteriaService: ExpenseSortCriteriaService,
              private expenseSpecCriteriaService: ExpenseSpecCriteriaService,
              private expenseSpecCriteriaComponent: ExpenseSpecCriteriaComponent) {
  }

  private page: Page = {
    number: 0,
    size: 10
  };

  private criteriaRequest: ExpenseCriteriaRequest = {
    page: this.page,
    searchSortCriteria: this.expenseSortCriteriaService.searchSortCriteria,
    searchSpecCriteria: this.expenseSpecCriteriaComponent.searchSpecCriteria,
  };


  get pageCriteria(): Page {
    return this.page;
  }

  set pageCriteria(value: Page) {
    this.page = value;
  }

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
