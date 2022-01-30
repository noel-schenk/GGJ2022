import React, { FC, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import Base from '../Base/Base';
import styles from './Menu.module.scss';

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  const [gameId, setGameId] = useState<string>();
  const [roomReady, setRoomReady] = useState(false);

  const createNewRoom = () => {
    GameServer.Instance.joinOrCreateGame().then(() => {
      setRoomReady(true);
    });
  };

  return roomReady ? (
    <Base />
  ) : (
    <div className={styles.Menu}>
      {
        <a className={styles.CreateNewRoom} onClick={createNewRoom}>
          Create new Room
        </a>
      }
      <span className={styles.JoinGameLabel}>OR join existing game</span>
      <input
        className={styles.GameIdInput}
        placeholder="Enter game ID"
        onChange={(ev) => {
          setGameId(ev.currentTarget.value);
        }}
        type="text"
      ></input>
      <a className={styles.JoinGame} onClick={() => GameServer.Instance.joinOrCreateGame(gameId)}>
        Join
      </a>
    </div>
  );
};

export default Menu;
