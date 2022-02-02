import React, { FC } from 'react';
import { tilePositionLeft, tilePositionTop } from '../../classes/Helper';
import { SpriteData } from '../../classes/SpriteData';
import styles from './Tile.module.scss';

interface TileProps {
  spriteData: SpriteData;
  index: number;
}

const Tile: FC<TileProps> = ({ spriteData, index }) => {
  return (
    <div
      className={styles.Tile}
      style={{
        width: spriteData.tilewidth,
        height: spriteData.tileheight,
      }}
    >
      <div
        className={styles.TileBackground}
        style={{
          backgroundImage: `url('${spriteData.src}')`,
          backgroundPositionY: -tilePositionTop(index - 1, spriteData),
          backgroundPositionX: -tilePositionLeft(index - 1, spriteData),
        }}
      ></div>
    </div>
  );
};

export default Tile;
