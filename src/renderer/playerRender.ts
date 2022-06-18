import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { getImage } from '../imageloader/imageStore';

const baseXList = [

]
const getPlayerSpos = (playerData: PlayerData) => {
  // TODO: プレイヤーの種類で変える
  const baseY = 0;
  const dir = [playerData.targetX - playerData.preX, playerData.targetY - playerData.preY];
  let baseX = 0;
  if (dir[0] === -1 && dir[1] === 0) {

  } else 

  return 
}

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
  ctx.drawImage(playerImage, x * dx, y * dy, dx, dy);
};
