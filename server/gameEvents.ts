import { Client } from 'colyseus';
import { Direction } from '../src/classes/Interfaces';
import { getActivePlayer, getPlayerCharacter, newPoint } from './helper';
import { BaseRoom } from './rooms';

export class GameEvents {
  constructor(public room: BaseRoom) {}

  onMove(direction: Direction, degree: number, client: Client) {
    const player = getActivePlayer(this.room, client);
    if (!player) return;

    const character = getPlayerCharacter(this.room, player);
    if (!character) return;

    const newPosition = newPoint(character.position.x, character.position.y, degree, 4);
    character.position.x = newPosition.x;
    character.position.y = newPosition.y;

    this.room.setState(this.room.state);
  }
}
