import { Room, Client } from 'colyseus';
import { PlayerState, RoomState } from './state';

export class BaseRoom extends Room<RoomState> {
  leader: Client;

  onCreate(options: any) {
    console.log('room created');

    this.setPrivate();

    this.setState(new RoomState());

    this.onMessage('view', (client, message) => {
      if (client !== this.leader) return;

      this.state.view = parseInt(message);
      console.log(client.sessionId, "sent 'view' message: ", message);
    });
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log('client joint');

    !this.leader && (this.leader = client);

    const newPlayerState = new PlayerState();

    this.state.players.push(newPlayerState);
    this.setState(this.state);
  }

  onLeave(client: Client, consented: boolean) {
    console.log('client left');
  }
}
