import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { TileMapData } from './TileMapData';
import { SpriteData } from './SpriteData';

export const tilePositionTop = (position: number, spriteData: SpriteData) => {
  return Math.floor(position / spriteData.columns) * (spriteData.tileheight + spriteData.spacing) || 0;
};

export const tilePositionLeft = (position: number, spriteData: SpriteData) => {
  return Math.floor(position % spriteData.columns) * (spriteData.tilewidth + spriteData.spacing) || 0;
};

export const gameFieldWidth = (mapData: TileMapData) => {
  return mapData.xSprites * (mapData.spriteData.tilewidth * mapData.spriteData.spacing);
};

export const gameFieldHeight = (mapData: TileMapData) => {
  return mapData.ySprites * (mapData.spriteData.tileheight * mapData.spriteData.spacing);
};

export const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export const useBehaviorSubject = <T>(rxjs: BehaviorSubject<T>) => {
  const [value, setValue] = useState<T>();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const rxjsSubscribe = rxjs.subscribe((newVal: T) => {
      setValue(newVal);
      forceUpdate(); // object ref not changing alternative to cloning object
    });
    return () => {
      rxjsSubscribe.unsubscribe();
    };
  }, []);

  return value;
};

export const getRandom = (array: ArrayLike<any>) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getTileMap = (name: string) => {
  return fetch(`/assets/${name}.xml`).then((res) => res.text());
};
