import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../model/room';

@Injectable()
export class RoomService {
  private url = 'http://localhost:8080/room-list';

  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.url);
  }
  public registerRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.url, room);
  }
}
