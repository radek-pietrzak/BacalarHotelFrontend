import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchSpecCriterion} from '../../model/search-spec-criterion';

@Component({
  selector: 'app-expense-spec-form',
  templateUrl: './expense-spec-form.component.html',
  styleUrls: ['./expense-spec-form.component.css']
})
export class ExpenseSpecFormComponent {

  form = new FormGroup({
    search: new FormGroup({
      key: new FormControl(null, Validators.required),
      operation: new FormControl('CONTAINS', Validators.required),
      content: new FormControl('', Validators.required)
    })
  });

  get searchContent(): any {
    return this.form.get('search.content');
  }

  onSubmit(): void {
    const searchCriterion: SearchSpecCriterion = {
      key: null,
      operation: 'CONTAINS',
      content: this.searchContent.value
    };

    // const fromAmountCriterion: SearchSpecCriterion = {
    //   key: 'amount',
    //   operation: 'GREATER',
    //   content: this.fromAmountForm.value.content
    // };
  }
}
