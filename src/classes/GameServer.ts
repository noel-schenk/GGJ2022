import { Client, Room } from 'colyseus.js';
import { Schema, ArraySchema } from '@colyseus/schema';
import { PlayerState, RoomState } from './Interfaces';
import { BehaviorSubject } from 'rxjs';
import { LocalState } from './LocalState';

export class GameServer {
  private static _GameServer: GameServer;
  client: Client;
  clientId: string;
  room: Room;
  roomState: BehaviorSubject<RoomState>; // DO NOT SUBSCRIBE or use .value directly inside component use 'useBehaviorSubject()'
  localState = new BehaviorSubject(new LocalState()); // DO NOT SUBSCRIBE or use .value directly inside component use 'useBehaviorSubject()'

  private constructor() {}

  public static get Instance() {
    this._GameServer || (this._GameServer = new this());
    this._GameServer.client = new Client('ws://localhost:2022');
    return this._GameServer;
  }

  joinOrCreateGame(id?: string) {
    const awaitingRoom = id ? this.client.joinById<RoomState>(id) : this.client.joinOrCreate<RoomState>('base');

    awaitingRoom
      .then((room) => {
        this.room = room;
        this.roomState = new BehaviorSubject(room.state);
        console.log(room.sessionId, 'joined', room.name);

        room.onMessage('*', this.onMessage.bind(this));
        room.onStateChange((state) => {
          this.roomState.next(state);
        });
      })
      .catch((e) => {
        console.log('JOIN ERROR', e);
      });

    return awaitingRoom;
  }

  sendMessage(type: string | number, message: any) {
    setTimeout(() => {
      this.room.send(type, message);
    });
  }

  onMessage(type: string | number | Schema, message: any) {
    switch (type) {
      case 'client_id':
        this.clientId = message;
    }
  }

  getCurrentPlayer(players: ArraySchema<PlayerState>) {
    return players.find((player) => player.id === this.clientId);
  }
}
