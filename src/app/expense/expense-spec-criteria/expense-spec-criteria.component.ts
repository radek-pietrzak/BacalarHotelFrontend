import {Component, OnInit} from '@angular/core';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';

@Component({
  selector: 'app-expense-spec-criteria',
  templateUrl: './expense-spec-criteria.component.html',
  styleUrls: ['./expense-spec-criteria.component.css'],
  providers: []
})
export class ExpenseSpecCriteriaComponent implements OnInit {

  private expenseSearchSpecCriterion: SearchSpecCriterion = {
    operation: 'CONTAINS',
    content: ''
  };

  private expenseSearchSpecCriteria: SearchSpecCriterion [] = [this.expenseSearchSpecCriterion];


  constructor() {
  }

  get searchSpecCriteria(): SearchSpecCriterion[] {
    return this.expenseSearchSpecCriteria;
  }

  ngOnInit(): void {
  }

}

