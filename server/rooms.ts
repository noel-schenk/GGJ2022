import { Room, Client } from 'colyseus';
import { Direction, EventMove, PlayerState, RoomState } from '../src/classes/Interfaces';
import { Schema } from '@colyseus/schema';
import { GameLoop } from './gameLoop';
import { GameEvents } from './gameEvents';
import { getActivePlayer } from './helper';

export class BaseRoom extends Room<RoomState> {
  leader: Client;
  gameLoop = new GameLoop(this);
  gameEvents = new GameEvents(this);

  onCreate(options: any) {
    console.log('room created');

    this.setPrivate();

    this.setState(new RoomState());

    this.onMessage('view', (client, message) => {
      if (client !== this.leader) return;

      this.state.view = parseInt(message);
      console.log(client.sessionId, 'sent "view" message: ', message);
    });

    this.onMessage('play', (client, message) => {
      switch (message) {
        case 'start':
          this.gameLoop.onGameStart();
          break;
      }
    });

    this.onMessage('move', (client, message: EventMove) => {
      this.gameEvents.onMove(message.direction, message.degree, client);
    });

    this.onMessage('setName', (client, message) => {
      const player = getActivePlayer(this, client);
      if (!player) return;

      player.name = message;
      console.log(client.sessionId, 'sent "setName" message: ', message);
    });
  }

  onJoin(client: Client, options: any, auth: any) {
    this.gameLoop.onJoin(client);
  }

  onLeave(client: Client, consented: boolean) {
    console.log('client left');
  }
}
