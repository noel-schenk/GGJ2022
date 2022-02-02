import { Client } from 'colyseus';
import { CharacterState, PlayerState } from '../src/classes/Interfaces';
import { BaseRoom } from './rooms';

export class GameLoop {
  constructor(public room: BaseRoom) {}

  onJoin = (client: Client) => {
    console.log('client joint');

    const isLeader = !this.room.leader;

    isLeader && (this.room.leader = client);

    const newPlayerState = new PlayerState();
    newPlayerState.id = client.id;
    isLeader && (newPlayerState.isLeader = true);

    this.room.state.players.push(newPlayerState);

    this.room.setState(this.room.state);
    client.send('client_id', client.id);
  };

  onGameStart() {
    this.initSpawnAllPlayerCharacters();
  }

  initSpawnAllPlayerCharacters() {
    this.room.state.players.forEach((player) => {
      this.spawnPlayerCharacter(player);
    });
  }

  spawnPlayerCharacter(player: PlayerState) {
    const newCharacter = new CharacterState();
    newCharacter.name = player.characterName;
    newCharacter.controllingPlayerId = player.id;
    this.room.state.mapState.characters.push(newCharacter);
  }
}
