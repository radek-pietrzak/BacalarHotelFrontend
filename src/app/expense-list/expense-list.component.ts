import {Component, OnInit} from '@angular/core';
import {ExpenseService} from '../services/expense.service';
import {Expense} from '../model/expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  providers: [ExpenseService]
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];


  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.findAll()
      .subscribe(expenses => this.expenses = expenses);
  }

}
