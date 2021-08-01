import {Injectable} from '@angular/core';
import {ExpenseCriteriaRequest} from '../../model/expense-criteria-request';
import {ExpenseSortCriteriaService} from './expense-sort-criteria.service';
import {ExpensePageCriteriaService} from './expense-page-criteria.service';
import {ExpenseSpecCriteriaService} from './expense-spec-criteria.service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCriteriaRequestService {

  constructor(private expenseSortCriteriaService: ExpenseSortCriteriaService,
              private expensePageCriteriaService: ExpensePageCriteriaService,
              private expenseSpecCriteriaService: ExpenseSpecCriteriaService) {
  }

  private expenseCriteriaRequest: ExpenseCriteriaRequest = {
    page: this.expensePageCriteriaService.page,
    searchSortCriteria: this.expenseSortCriteriaService.searchSortCriteria,
    searchSpecCriteria: this.expenseSpecCriteriaService.searchSpecCriteria,
  };

  get criteriaRequest(): ExpenseCriteriaRequest {
    return this.expenseCriteriaRequest;
  }

  searchForm(): FormGroup {
    return this.expenseSpecCriteriaService.searchForm;
  }


}
