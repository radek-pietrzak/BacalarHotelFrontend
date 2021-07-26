import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense} from '../model/expense';
import {ExpenseRequest} from '../model/expense-request';
import {ExpenseCriteriaRequest} from '../model/expense-criteria-request';
import {ResponseExpenses} from '../model/response-expenses';

@Injectable()
export class ExpenseService {
  private url = 'http://localhost:8080/home-budget/expenses';

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observable: ResponseExpenses
  };

  public findAll(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.url);
  }

  public findAllPost(criteriaRequest: ExpenseCriteriaRequest): Observable<ResponseExpenses> {
    return this.httpClient.post<ResponseExpenses>(this.url, criteriaRequest, this.httpOptions);
  }

  public editExpense(expenseRequest: ExpenseRequest): Observable<ExpenseRequest> {
    return this.httpClient.put<ExpenseRequest>(this.url, expenseRequest, this.httpOptions);
  }

  public deleteExpense(id: string): Observable<string> {
    return this.httpClient.delete<string>(this.url + '/' + id);
  }

  getExpense(id: string): Observable<Expense> {
    return this.httpClient.get<Expense>(this.url + '/' + id);
  }

}
