import { Client } from 'colyseus';
import { PlayerState, XY } from '../src/classes/Interfaces';
import { BaseRoom } from './rooms';

export const getActivePlayer = (room: BaseRoom, client: Client) => {
  return room.state.players.find((player) => player.id === client.id);
};

export const getPlayerCharacter = (room: BaseRoom, player: PlayerState) => {
  return room.state.mapState.characters.find((character) => character.controllingPlayerId === player.id);
};

// https://stackoverflow.com/a/27572056/4563136 & https://stackoverflow.com/a/44912872/4563136
export const newPoint = (x: number, y: number, degree: number, distance: number) => {
  const result = new XY();

  result.x = Math.round(Math.cos((degree * Math.PI) / 180) * distance + x);
  result.y = Math.round(Math.sin((((degree + 180) % 360) * Math.PI) / 180) * distance + y);

  return result;
};
