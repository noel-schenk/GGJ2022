import React, { FC, useEffect, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import { useBehaviorSubject, useForceUpdate } from '../../classes/Helper';
import { CharacterState } from '../../classes/Interfaces';
import { SpriteData } from '../../classes/SpriteData';
import Tile from '../Tile/Tile';
import styles from './Character.module.scss';

interface CharacterProps {
  character: CharacterState;
}

const Character: FC<CharacterProps> = ({ character }) => {
  const [characterSprite, setCharacterSprite] = useState(new SpriteData());
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    characterSprite.init(`/characters/${character.name}`).then((characterSprite) => {
      forceUpdate();
    });
  }, []);

  return (
    <div
      className={styles.Character}
      style={{
        top: character.position.y,
        left: character.position.x,
      }}
    >
      <Tile spriteData={characterSprite} index={1}></Tile>
    </div>
  );
};

export default Character;
