import { GhostData } from '../data/ghostData';
import { MapData } from '../data/mapData';

// ある方向に一マス移動する
export const ghostMover = (ghostData: GhostData, mapData: MapData) => { // なんでexportするんだっけ
  const checkCollisionWall = (gx:number, gy:number) => {
    const { width } = mapData;
    return mapData.data[gy * width + gx] !== '#';
  };
  const gnow = Date.now() / 1000;
  const ginterval = 0.1;
  const random = Math.floor(Math.random() * 4);// 壁は考えていないし、外のWallも考えていない。とりまランダム移動
  // 方向決定
  if (random === 0) {
    ghostData.gdirect = 'gUp';
  } else if (random === 1) {
    ghostData.gdirect = 'gDown';
  } else if (random === 2) {
    ghostData.gdirect = 'gLeft';
  } else {
    ghostData.gdirect = 'gRight';
  }
  // 座標と動きもろもろ
  if (gnow - ghostData.gstart < ginterval) {
    ghostData.gx = (ghostData.gtargetX - ghostData.gpreX)
    * ((gnow - ghostData.gstart) / ginterval) + ghostData.gpreX; // なめらか移動
    ghostData.gy = (ghostData.gtargetY - ghostData.gpreY)
    * ((gnow - ghostData.gstart) / ginterval) + ghostData.gpreY;
  } else { // 到着したとき
    ghostData.gstart = gnow;
    ghostData.gpreX = ghostData.gtargetX;
    ghostData.gpreY = ghostData.gtargetY;
    switch (ghostData.gdirect) {
      case 'gUp':
        ghostData.gtargetX = ghostData.gpreX;
        ghostData.gtargetY = ghostData.gpreY - 1; // →をx正,↓をy正として考えていることに注意
        break;
      case 'gDown':
        ghostData.gtargetX = ghostData.gpreX;
        ghostData.gtargetY = ghostData.gpreY + 1;
        break;
      case 'gLeft':
        ghostData.gtargetX = ghostData.gpreX - 1;
        ghostData.gtargetY = ghostData.gpreY;
        break;
      case 'gRight':
        ghostData.gtargetX = ghostData.gpreX + 1;
        ghostData.gtargetY = ghostData.gpreY;
        break;
      default:
        throw new Error('ghostDirectionErrorです');
    }
    if (!checkCollisionWall(ghostData.gtargetX, ghostData.gtargetY)) {
      ghostData.gtargetX = ghostData.gpreX;
      ghostData.gtargetY = ghostData.gpreY;
    }
  }
};
