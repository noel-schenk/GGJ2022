import React, { FC, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import { Views } from '../../classes/Interfaces';
import styles from './Lobby.module.scss';
import { Room } from 'colyseus.js';
import { useBehaviorSubject } from '../../classes/Helper';
import { GameLoop } from '../../classes/GameLoop';

interface LobbyProps {}

const Lobby: FC<LobbyProps> = () => {
  const roomState = useBehaviorSubject(GameServer.Instance.roomState);

  const changeName = (name: string) => {
    GameServer.Instance.sendMessage('setName', name);
  };

  if (!roomState) return <></>;

  return (
    <div className={styles.Lobby}>
      <span className={styles.RoomId}>Your room id is: {GameServer.Instance.room?.id}</span>
      <span>
        Set your name: <input type="text" onChange={(ev) => changeName(ev.currentTarget.value)} />
      </span>
      <div className={styles.PlayerNameContainer}>
        {roomState.players.map((player, playerIndex) => {
          return (
            <span className={styles.PlayerName} key={playerIndex}>
              {player.name} {player.isLeader && '👑'}
            </span>
          );
        })}
      </div>
      {GameServer.Instance.getCurrentPlayer(roomState.players)?.isLeader && (
        <a className={styles.StartGame} onClick={() => GameLoop.init()}>
          Start Game
        </a>
      )}
    </div>
  );
};

export default Lobby;
