import React, { FC } from 'react';
import styles from './Lobby.module.scss';

interface LobbyProps {}

const Lobby: FC<LobbyProps> = () => <div className={styles.Lobby}>WE IN ZE LOBBY NOW</div>;

export default Lobby;
