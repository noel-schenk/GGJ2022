import React from 'react';
import { tilePositionLeft, tilePositionTop } from './Helper';

export class SpriteData {
  tilewidth: number;
  tileheight: number;
  spacing: number;
  tilecount: number;
  columns: number;
  src: string;

  constructor() {}

  async init(spriteName: string) {
    this.src = `/assets/sprites/${spriteName}.png`;

    const spriteStringData = await fetch(`/assets/sprites/${spriteName}.xml`).then((res) => res.text());
    const spriteXMLData = new DOMParser().parseFromString(spriteStringData, 'text/xml');
    const spriteData = spriteXMLData.getElementsByTagName('tileset')[0].attributes as any;

    this.tilewidth = parseInt(spriteData.tilewidth.value);
    this.tileheight = parseInt(spriteData.tileheight.value);
    this.spacing = parseInt(spriteData.spacing?.value || 0);
    this.tilecount = parseInt(spriteData.tilecount.value);
    this.columns = parseInt(spriteData.columns.value);
    return this;
  }
}
