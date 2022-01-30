import React, { FC, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import Base from '../Base/Base';
import styles from './Menu.module.scss';

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  const [gameId, setGameId] = useState<string>();
  const [roomReady, setRoomReady] = useState(false);

  const joinOrCreateGame = () => {
    GameServer.Instance.joinOrCreateGame(gameId).then(() => {
      setRoomReady(true);
    });
  };

  return roomReady ? (
    <Base />
  ) : (
    <div className={styles.Menu}>
      <input
        className={styles.GameIdInput}
        placeholder="Enter game ID to join room"
        onChange={(ev) => {
          setGameId(ev.currentTarget.value);
        }}
        type="text"
      ></input>
      <a className={styles.JoinGame} onClick={() => joinOrCreateGame()}>
        {gameId && 'Join Room'}
        {!gameId && 'Create Room'}
      </a>
    </div>
  );
};

export default Menu;
