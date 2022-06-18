import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { getImage } from '../imageloader/imageStore';

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
  const playerImage = getImage('player');
  ctx.drawImage(playerImage, 0, 0, 64, 64, x * dx, y * dy, dx, dy);
};
