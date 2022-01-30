import { Client, Room } from 'colyseus.js';
import { Schema } from '@colyseus/schema';
import { PlayerState, RoomState } from './Interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

export class GameServer {
  private static _GameServer: GameServer;
  client: Client;
  room: Room;
  roomState: BehaviorSubject<RoomState>;
  player: PlayerState;

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
          console.log(state, 'onStateChange');
          this.roomState.next(state);
        });
      })
      .catch((e) => {
        console.log('JOIN ERROR', e);
      });

    return awaitingRoom;
  }

  sendMessage(type: string | number, message: any) {
    this.room.send(type, message);
  }

  onMessage(type: string | number | Schema, message: any) {
    switch (type) {
      case typeof PlayerState:
        this.player = message;
        break;
    }
  }
}
