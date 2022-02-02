import { LayerData } from './LayerData';
import { SpriteData } from './SpriteData';
import { getTileMap } from './Helper';

export class TileMapData {
  xSprites: number;
  ySprites: number;
  layers: LayerData[];
  spriteData: SpriteData;

  private constructor() {}

  static async init(name: string) {
    const _this = new TileMapData();

    const tileMapStringData = await getTileMap(name);

    const tileMapXMLData = new DOMParser().parseFromString(tileMapStringData, 'text/xml');

    const tileMapData = tileMapXMLData.getElementsByTagName('map')[0];

    _this.ySprites = parseInt(tileMapData.getAttribute('height') as string);
    _this.xSprites = parseInt(tileMapData.getAttribute('width') as string);

    _this.spriteData = new SpriteData();

    await _this.spriteData.init(
      (
        (tileMapData.getElementsByTagName('tileset')[0].getAttribute('source') as string)
          .split('/')
          .filter((val, index, arr) => index > arr.length - 3)
          .join('/') as string
      ).replace('.xml', '')
    );

    _this.layers = [...tileMapData.getElementsByTagName('layer')].map((layerData) => {
      const newLayerData = new LayerData();
      newLayerData.sprites = layerData
        .getElementsByTagName('data')[0]
        .innerHTML.replace(/(\r\n|\n|\r)/gm, '')
        .split(',')
        .map(Number);
      return newLayerData;
    });
    return _this;
  }
}
