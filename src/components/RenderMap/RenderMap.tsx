import React, { FC, useEffect, useState } from 'react';
import { gameFieldHeight, gameFieldWidth, tilePositionLeft, tilePositionTop } from '../../classes/Helper';
import { MapData } from '../../classes/MapData';
import styles from './RenderMap.module.scss';

interface RenderMapProps {
  mapName: string;
}

const RenderMap: FC<RenderMapProps> = ({ mapName }) => {
  const [mapData, setMapData] = useState<MapData>();

  useEffect(() => {
    const mapData = MapData.init(mapName);

    mapData.then((mapData) => {
      setMapData(mapData);
    });
  }, []);

  return mapData ? (
    <div
      className={styles.RenderMap}
      style={{
        width: gameFieldWidth(mapData),
        height: gameFieldHeight(mapData),
      }}
    >
      {mapData.layers.map((layer, layerIndex) => (
        <div className={styles.Layer} key={layerIndex}>
          {layer.sprites.map((spriteIndex, tileIndex) => {
            let backgroundImage = mapData.spriteData.src;
            return (
              <div
                key={tileIndex}
                style={{
                  width: mapData.spriteData.tilewidth,
                  height: mapData.spriteData.tileheight,
                }}
              >
                {spriteIndex !== 0 && (
                  <div
                    className={styles.Tile}
                    style={{
                      backgroundImage: `url('${backgroundImage}')`,
                      backgroundPositionY: -tilePositionTop(spriteIndex - 1, mapData.spriteData),
                      backgroundPositionX: -tilePositionLeft(spriteIndex - 1, mapData.spriteData),
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  ) : (
    <>Map is loading</>
  );
};

export default RenderMap;
