import { Schema, ArraySchema, type } from '@colyseus/schema';

export class XY extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
}

export class PlayerState extends Schema {
  @type(XY) backgroundPositon = new XY();
  @type('string') name = '';
  @type('string') id = '';
  @type('boolean') isLeader = false;
}

export class RoomState extends Schema {
  @type([PlayerState]) players = new ArraySchema<PlayerState>();
  @type('number') view = Views.Lobby;

  getCurrentPlayer = (id: string) => {
    return this.players.find((player) => player.id === id);
  };
}

export enum Views {
  Lobby,
  Game,
}
