import { maps } from './Maps';
import { GameServer } from './GameServer';
import { getRandom } from './Helper';
import { Views } from './Interfaces';

export class GameLoop {
  private constructor() {}

  static init() {
    this.setGameView();
    this.loadRandomMap();
    this.startGame();
  }

  static startGame() {
    GameServer.Instance.sendMessage('play', 'start');
  }

  static setGameView() {
    GameServer.Instance.sendMessage('view', Views.Game);
  }

  static loadRandomMap() {
    GameServer.Instance.roomState.value.mapState.mapName = getRandom(maps);
  }
}
