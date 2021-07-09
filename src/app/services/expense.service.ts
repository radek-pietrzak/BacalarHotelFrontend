import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense} from '../model/expense';
import {ExpenseRequest} from '../model/expense-request';

@Injectable()
export class ExpenseService {
  private url = 'http://localhost:8080/home-budget/expenses';

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public findAll(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.url);
  }


  public addExpense(expenseRequest: ExpenseRequest): Observable<ExpenseRequest> {
    return this.httpClient.put<ExpenseRequest>(this.url, expenseRequest, this.httpOptions);
  }
}
