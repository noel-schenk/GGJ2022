export class SpriteData {
  tilewidth: number;
  tileheight: number;
  spacing: number;
  tilecount: number;
  columns: number;
  src: string;

  private constructor() {}

  static async init(spriteName: string) {
    const _this = new SpriteData();

    _this.src = `/assets/sprites/${spriteName}.png`;

    const spriteStringData = await fetch(`/assets/sprites/${spriteName}.xml`).then((res) => res.text());
    const spriteXMLData = new DOMParser().parseFromString(spriteStringData, 'text/xml');
    const spriteData = spriteXMLData.getElementsByTagName('tileset')[0].attributes as any;

    _this.tilewidth = parseInt(spriteData.tilewidth.value);
    _this.tileheight = parseInt(spriteData.tileheight.value);
    _this.spacing = parseInt(spriteData.spacing.value);
    _this.tilecount = parseInt(spriteData.tilecount.value);
    _this.columns = parseInt(spriteData.columns.value);

    return _this;
  }
}
