import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';
import {ExpenseListComponent} from '../expense-list/expense-list.component';
import {ExpenseCriteriaRequestService} from '../services/expense-criteria-request.service';

@Component({
  selector: 'app-expense-spec-form',
  templateUrl: './expense-spec-form.component.html',
  styleUrls: ['../expense.css']
})
export class ExpenseSpecFormComponent {

  form = this.setFormGroup();
  private expenseList: ExpenseListComponent;
  private expenseCriteriaRequest: ExpenseCriteriaRequestService;
  clearBtnDisabled: boolean;
  days: number[];

  constructor(expenseList: ExpenseListComponent, expenseCriteriaRequest: ExpenseCriteriaRequestService) {
    this.expenseList = expenseList;
    this.expenseCriteriaRequest = expenseCriteriaRequest;
    this.clearBtnDisabled = true;
  }

  setFormGroup(): FormGroup {
    return new FormGroup({
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
    return this.form.get('search.content');
  }

  get fromAmountContent(): any {
    return this.form.get('fromAmount.content');
  }

  get toAmountContent(): any {
    return this.form.get('toAmount.content');
  }

  get fromPayDateContent(): any {
    return this.form.get('fromPayDate.content');
  }

  get toPayDateContent(): any {
    return this.form.get('toPayDate.content');
  }

  submitSpecCriteria(): void {
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
      content: this.getPayDateFromDay(this.fromPayDateContent.value)
    };

    const toPayDateCriterion: SearchSpecCriterion = {
      key: 'payDate',
      operation: 'LESS',
      content: this.getPayDateFromDay(this.toPayDateContent.value)
    };

    this.expenseCriteriaRequest.setCriteriaRequestBySpec(
      searchCriterion,
      fromAmountCriterion,
      toAmountCriterion,
      fromPayDateCriterion,
      toPayDateCriterion
    );

    this.expenseList.getAllExpenses();
    this.clearBtnDisabled = false;
  }

  clearSearch(): void {
    this.form.reset();
    this.submitSpecCriteria();
    this.clearBtnDisabled = true;
  }

  getLastDayOfMonth(): string {
    return this.expenseList.responseExpenses.requestedDate.substring(8);
  }

  getPayDateFromDay(day: string): string {
    if (null !== day) {
      const dayNumber = Number(day);
      if (dayNumber > 9) {
        return this.expenseList.responseExpenses.requestedDate.substring(0, 8) + day;
      } else {
        return this.expenseList.responseExpenses.requestedDate.substring(0, 8) + '0' + day;
      }
    }
  }

}
