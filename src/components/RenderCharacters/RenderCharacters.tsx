import React, { FC } from 'react';
import { GameServer } from '../../classes/GameServer';
import { useBehaviorSubject } from '../../classes/Helper';
import Character from '../Character/Character';
import styles from './RenderCharacters.module.scss';

interface RenderCharactersProps {}

const RenderCharacters: FC<RenderCharactersProps> = () => {
  const roomState = useBehaviorSubject(GameServer.Instance.roomState);
  const localState = useBehaviorSubject(GameServer.Instance.localState);

  if (!roomState) return <></>;

  return (
    <div
      className={styles.RenderCharacters}
      style={{
        width: localState && window.innerWidth / localState.mapScaling,
        height: localState?.mapSize.y,
        transform: `scale(${localState?.mapScaling})`,
      }}
    >
      <div className={styles.CharacterMovementContainer}>
        {roomState.mapState.characters.map((character, characterIndex) => (
          <Character key={characterIndex} character={character}></Character>
        ))}
      </div>
    </div>
  );
};

export default RenderCharacters;
