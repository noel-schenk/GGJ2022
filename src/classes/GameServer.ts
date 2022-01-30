import { Client, Room } from 'colyseus.js';
import { RoomState } from '../../server/state';

export class GameServer {
  private static _GameServer: GameServer;
  client: Client;
  room: Room;

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

        console.log(room.sessionId, 'joined', room.name);
      })
      .catch((e) => {
        console.log('JOIN ERROR', e);
      });

    return awaitingRoom;
  }
}
