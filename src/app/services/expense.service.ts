import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense} from '../model/expense';

@Injectable()
export class ExpenseService {
  private url = 'http://localhost:8080/home-budget/expenses';

  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(this.url);
  }

  // public registerGuest(guest: Guest): Observable<Guest> {
  //   return this.httpClient.post<Guest>(this.url, guest);
  // }
}
