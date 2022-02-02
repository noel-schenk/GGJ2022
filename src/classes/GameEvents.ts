import { GameServer } from './GameServer';
import { Direction, EventMove } from './Interfaces';

export class GameEvents {
  static onMove(direction: Direction, degree: number) {
    const eventMove = new EventMove();
    eventMove.degree = degree;
    eventMove.direction = direction;
    GameServer.Instance.sendMessage('move', eventMove);
  }
}
