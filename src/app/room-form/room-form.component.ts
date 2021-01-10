import {Component, OnInit} from '@angular/core';
import {Room} from '../model/room';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
  providers: [RoomService]
})
export class RoomFormComponent implements OnInit {
  newRoom: Room = {
    roomNumber: 0,
    numberOfSingleBed: 0,
    numberOfDoubleBed: 0,
  };

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.roomService.findAll();
  }


  onSubmit(): void {
    this.newRoom.numberOfPerson
      = +this.newRoom.numberOfSingleBed + (+this.newRoom.numberOfDoubleBed as number * 2);
    this.roomService.registerRoom(this.newRoom)
      .subscribe(() => this.roomService.findAll());
  }

}
