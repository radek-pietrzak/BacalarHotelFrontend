import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ExpenseService} from '../services/expense.service';
import {ExpenseRequest} from '../model/expense-request';
import {ExpenseModification} from '../model/expense-modification';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  providers: [ExpenseService, ExpenseRequest, ExpenseModification]
})
export class ExpenseAddComponent implements OnInit {
  expenseAddForm: FormGroup;

  constructor(private httpService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseAddForm = new FormGroup({
      user: new FormControl(),
      amount: new FormControl(),
      currency: new FormControl(),
      description: new FormControl(),
      payDate: new FormControl(),
      payMethodName: new FormControl(),
      categoryName: new FormControl(),
    });
  }


  onSubmit(): void {
    const expenseModification: ExpenseModification = {
      user: this.expenseAddForm.value.user,
      amount: this.expenseAddForm.value.amount,
      currency: this.expenseAddForm.value.currency,
      description: this.expenseAddForm.value.description,
      payDate: this.expenseAddForm.value.payDate,
      payMethodName: this.expenseAddForm.value.payMethodName,
      categoryName: this.expenseAddForm.value.categoryName,
    };

    const expenseRequest: ExpenseRequest = {
      expense: expenseModification
    };

    this.httpService
      .addExpense(expenseRequest)
      .subscribe(() => {
        alert('Expense added');
        // this.expenseAddForm.reset();
      });
  }

}
