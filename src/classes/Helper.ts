import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { MapData } from './MapData';
import { SpriteData } from './SpriteData';

export const tilePositionTop = (position: number, spriteData: SpriteData) => {
  return Math.floor(position / spriteData.columns) * (spriteData.tileheight + spriteData.spacing);
};

export const tilePositionLeft = (position: number, spriteData: SpriteData) => {
  return Math.floor(position % spriteData.columns) * (spriteData.tilewidth + spriteData.spacing);
};

export const gameFieldWidth = (mapData: MapData) => {
  return mapData.xSprites * (mapData.spriteData.tilewidth * mapData.spriteData.spacing);
};

export const gameFieldHeight = (mapData: MapData) => {
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
    rxjs.subscribe((newVal: T) => {
      setValue(newVal);
      forceUpdate(); // object ref not changing alternative to cloning object
    });
  }, []);

  console.log(value, 'value');

  return value;
};
