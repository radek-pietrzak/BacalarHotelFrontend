import {Injectable} from '@angular/core';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpenseSpecCriteriaService {

  constructor() {
  }

  private expenseSearchForm: FormGroup;

  private expenseSearchSpecCriterion: SearchSpecCriterion = {
    operation: 'CONTAINS',
    content: ''
  };

  private expenseSearchSpecCriteria: SearchSpecCriterion [] = [this.expenseSearchSpecCriterion];

  searchFormGroup(): void {
    this.expenseSearchForm = new FormGroup({
      key: new FormControl(null, Validators.required),
      operation: new FormControl('CONTAINS', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  get searchSpecCriteria(): SearchSpecCriterion [] {
    return this.expenseSearchSpecCriteria;
  }

  set searchSpecCriterion(value: SearchSpecCriterion) {
    this.expenseSearchSpecCriterion = value;
  }

  get searchForm(): FormGroup {
    return this.expenseSearchForm;
  }
}
