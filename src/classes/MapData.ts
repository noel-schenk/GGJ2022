import { LayerData } from './LayerData';
import { SpriteData } from './SpriteData';

export class MapData {
  xSprites: number;
  ySprites: number;
  layers: LayerData[];
  spriteData: SpriteData;

  private constructor() {}

  static async init(name: string) {
    const _this = new MapData();

    const mapStringData = await fetch(`/assets/maps/${name}.xml`).then((res) => res.text());
    const mapXMLData = new DOMParser().parseFromString(mapStringData, 'text/xml');

    const mapData = mapXMLData.getElementsByTagName('map')[0];

    _this.ySprites = parseInt(mapData.getAttribute('height') as string);
    _this.xSprites = parseInt(mapData.getAttribute('width') as string);

    _this.spriteData = await SpriteData.init(
      (
        (mapData.getElementsByTagName('tileset')[0].getAttribute('source') as string).split('/').pop() as string
      ).replace('.xml', '')
    );

    _this.layers = [...mapData.getElementsByTagName('layer')].map((layerData) => {
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
