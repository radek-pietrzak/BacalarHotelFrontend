import {Component, OnInit} from '@angular/core';
import {Expense} from '../model/expense';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {ExpenseModification} from '../model/expense-modification';
import {ExpenseRequest} from '../model/expense-request';
import {ExpenseService} from '../services/expense.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css'],
  providers: [ExpenseService, DatePipe]
})
export class ExpenseDetailsComponent implements OnInit {

  id$: Observable<string>;
  id: string;
  datePipeString: string;
  expenseAddForm: FormGroup;
  expenseForm: FormGroupName;
  expense: Expense = {};
  user: string;
  edit = false;

  constructor(private datePipe: DatePipe, private expenseService: ExpenseService, private route: ActivatedRoute) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')));
    this.id = this.route.snapshot.paramMap.get('id');
    this.expenseService.getExpense(this.id).subscribe(expense => {
      this.expense = expense;
      this.user = expense.user;
    });

  }

  updateExpense(): void {
    const expenseModification: ExpenseModification = {
      id: this.expense.id.toString(),
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

    if (confirm('Are you sure to update this expense?')) {
      this.expenseService
        .editExpense(expenseRequest)
        .subscribe(() => {
          window.location.reload();
        });
    }
  }


  deleteExpense(id: number): void {
    if (confirm('Are you sure to delete this expense?')) {
      this.expenseService.deleteExpense(id.toString()).subscribe();
      window.location.reload();
    }
  }

  setEditOn(): void {
    this.expenseAddForm = new FormGroup({
      user: new FormControl(this.expense.user, Validators.required),
      amount: new FormControl(this.expense.amount, Validators.required),
      currency: new FormControl(this.expense.currency, Validators.required),
      description: new FormControl(this.expense.description, Validators.required),
      payDate: new FormControl(this.expense.payDate, Validators.required),
      payMethodName: new FormControl(this.expense.payMethod.payMethodName, Validators.required),
      categoryName: new FormControl(this.expense.expenseCategory.categoryName, Validators.required),
    });
    this.edit = true;
  }

  discardChanges(): void {
    if (confirm('Are you sure to discard changes?')) {
      window.location.reload();
    }
  }
}
