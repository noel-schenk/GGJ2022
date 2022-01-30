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
