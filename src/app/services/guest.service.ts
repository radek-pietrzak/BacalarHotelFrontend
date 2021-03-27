import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Guest} from '../model/guest';

@Injectable()
export class GuestService {
  private url = 'http://localhost:8080/guest-list';

  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(this.url);
  }
  // public registerGuest(guest: Guest): Observable<Guest> {
  //   return this.httpClient.post<Guest>(this.url, guest);
  // }
}
