import React, { FC } from 'react';
import { GameServer } from '../../classes/GameServer';
import RenderMap from '../RenderMap/RenderMap';
import styles from './GameView.module.scss';

interface GameViewProps {}

const GameView: FC<GameViewProps> = () => {
  return (
    <div className={styles.GameView}>
      <RenderMap mapName="map1" />
    </div>
  );
};

export default GameView;
