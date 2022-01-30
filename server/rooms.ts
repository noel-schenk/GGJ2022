import { Room, Client } from 'colyseus';
import { PlayerState, RoomState } from '../src/classes/Interfaces';
import { Schema } from '@colyseus/schema';

export class BaseRoom extends Room<RoomState> {
  leader: Client;

  onCreate(options: any) {
    console.log('room created');

    this.setPrivate();

    this.setState(new RoomState());

    this.onMessage('view', (client, message) => {
      if (client !== this.leader) return;

      this.state.view = parseInt(message);
      console.log(client.sessionId, 'sent "view" message: ', message);
    });

    this.onMessage('setName', (client, message) => {
      const player = this.state.getCurrentPlayer(client.id);
      if (!player) return;

      player.name = message;
      console.log(client.sessionId, 'sent "setName" message: ', message);
    });
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log('client joint');

    const isLeader = !this.leader;

    isLeader && (this.leader = client);

    const newPlayerState = new PlayerState();
    newPlayerState.id = client.id;
    isLeader && (newPlayerState.isLeader = true);

    this.state.players.push(newPlayerState);

    this.setState(this.state);

    client.send(typeof PlayerState, newPlayerState);
  }

  onLeave(client: Client, consented: boolean) {
    console.log('client left');
  }
}
