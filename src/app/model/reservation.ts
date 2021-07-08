import {Guest} from './guest';
import {RoomReservation} from './room-reservation';

export class Reservation {
  id?: number;
  date?: Date;
  roomReservation?: RoomReservation;
  guest?: Guest;
}
