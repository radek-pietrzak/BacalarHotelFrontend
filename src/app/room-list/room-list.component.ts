import {Component, OnInit} from '@angular/core';
import {Room} from '../model/room';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomService]
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];


  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.roomService.findAll()
      .subscribe(rooms => this.rooms = rooms);
  }

}
