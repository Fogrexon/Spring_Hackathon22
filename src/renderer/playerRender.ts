import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';

export const playerRender = (
  playerData: PlayerData,
  mapData: MapData,
  ctx: CanvasRenderingContext2D,
) => {
  const {
    x, y,
  } = playerData;
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const dx = canvasWidth / mapData.width;
  const dy = canvasHeight / mapData.height;
  ctx.fillStyle = '#f00';
  ctx.fillRect(x * dx, y * dy, dx, dy);
};
