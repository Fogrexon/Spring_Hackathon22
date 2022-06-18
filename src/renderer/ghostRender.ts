import { MapData } from '../data/mapData';
import { GhostData } from '../data/ghostData';

export const ghostRender = (
  ghostData: GhostData,
  mapData: MapData,
  ctx: CanvasRenderingContext2D,
) => {
  const {
    gx, gy,
  } = ghostData;
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const dx = canvasWidth / mapData.width;
  const dy = canvasHeight / mapData.height;
  ctx.fillStyle = '#ff0';
  ctx.fillRect(gx * dx, gy * dy, dx, dy);
};
