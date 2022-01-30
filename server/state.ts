import { Views, XY } from '../src/classes/Interfaces';
import { Schema, ArraySchema, type } from '@colyseus/schema';

export class _XY extends Schema implements XY {
  @type('number') x = 0;
  @type('number') y = 0;
}

export class PlayerState extends Schema {
  @type(_XY) backgroundPositon = new _XY();
}

export class RoomState extends Schema {
  @type([PlayerState]) players = new ArraySchema<PlayerState>();
  @type('number') view = Views.Lobby;
}
