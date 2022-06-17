import { MapData } from '../data/mapData';

// アイテムを描画する処理をする必要がある。描画しなくなる必要もある。
 
// 納品場所を描画する

export const mapRender = (mapData: MapData, ctx: CanvasRenderingContext2D) => {
  const { data, width, height } = mapData;
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const dx = canvasWidth / width;
  const dy = canvasHeight / height;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const char = data[y * width + x];
      if (char === '#') {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = '#fff';
      }
      ctx.fillRect(x * dx, y * dy, dx, dy);
    }
  }
  
};
