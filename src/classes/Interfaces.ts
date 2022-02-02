import { Schema, ArraySchema, type } from '@colyseus/schema';
export class XY extends Schema {
  @type('number') x = 0;
  @type('number') y = 0;
}

export class EventMove {
  direction = 'up' as Direction;
  degree = 0;
}

export enum Direction {
  up = 'up',
  right = 'right',
  down = 'down',
  left = 'left',
}

export class PlayerState extends Schema {
  @type('string') name = '';
  @type('string') id = '';
  @type('boolean') isLeader = false;
  @type('string') characterName = 'adventurer';
}

export class CharacterState extends Schema {
  @type('string') controllingPlayerId: string;
  @type('string') name = '';
  @type(XY) position = new XY();
}

export class MapState extends Schema {
  @type([CharacterState]) characters = new ArraySchema<CharacterState>();
  @type([CharacterState]) opponents = new ArraySchema<CharacterState>();
  @type('string') mapName = 'map1';
}

export class RoomState extends Schema {
  @type([PlayerState]) players = new ArraySchema<PlayerState>();
  @type(MapState) mapState = new MapState();

  @type('number') view = Views.Lobby;
}

export enum Views {
  Lobby,
  Game,
}
