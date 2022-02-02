import React, { FC, useEffect, useState } from 'react';
import { GameServer } from '../../classes/GameServer';
import { gameFieldHeight, gameFieldWidth, getRandom, useBehaviorSubject } from '../../classes/Helper';
import { TileMapData } from '../../classes/TileMapData';
import { maps } from '../../classes/Maps';
import styles from './RenderMap.module.scss';
import Tile from '../Tile/Tile';
import { LocalState } from '../../classes/LocalState';
import { XY } from '../../classes/Interfaces';

interface RenderMapProps {}

const RenderMap: FC<RenderMapProps> = () => {
  const [mapData, setMapData] = useState<TileMapData>();
  const roomState = useBehaviorSubject(GameServer.Instance.roomState);
  const localState = useBehaviorSubject(GameServer.Instance.localState);

  useEffect(() => {
    const mapData = TileMapData.init(getRandom(maps));

    mapData.then((mapData) => {
      setMapData(mapData);

      const newLocalState = GameServer.Instance.localState.value.clone();
      newLocalState.mapScaling = window.innerHeight / gameFieldHeight(mapData);
      newLocalState.mapSize.x = gameFieldWidth(mapData);
      newLocalState.mapSize.y = gameFieldHeight(mapData);

      GameServer.Instance.localState.next(newLocalState);
    });
  }, [, roomState]);

  return mapData ? (
    <div className={styles.RenderMapHolding}>
      <div
        className={styles.RenderMap}
        style={{
          width: localState?.mapSize.x,
          height: localState?.mapSize.y,
          transform: `scale(${localState?.mapScaling})`,
        }}
      >
        {mapData.layers.map((layer, layerIndex) => (
          <div className={styles.Layer} key={layerIndex}>
            {layer.sprites.map((spriteIndex, tileIndex) => {
              return (
                <div
                  key={tileIndex}
                  style={{
                    width: mapData.spriteData.tilewidth,
                    height: mapData.spriteData.tileheight,
                  }}
                >
                  {spriteIndex !== 0 && <Tile index={spriteIndex} spriteData={mapData.spriteData}></Tile>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <>Map is loading</>
  );
};

export default RenderMap;
