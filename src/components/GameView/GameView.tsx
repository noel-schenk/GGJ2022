import React, { FC } from 'react';
import Joystick from '../Joystick/Joystick';
import RenderCharacters from '../RenderCharacters/RenderCharacters';
import RenderMap from '../RenderMap/RenderMap';
import styles from './GameView.module.scss';

interface GameViewProps {}

const GameView: FC<GameViewProps> = () => {
  return (
    <div className={styles.GameView}>
      <Joystick />
      <RenderCharacters />
      <RenderMap />
    </div>
  );
};

export default GameView;
