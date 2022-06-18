import { GhostData } from '../data/ghostData';
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';

// ある方向に一マス移動する
export const ghostMover = (tekito: GhostData, mapData: MapData, playerData: PlayerData) => {
  const checkCollisionWall = (gx:number, gy:number) => {
    const { width } = mapData;
    return mapData.data[gy * width + gx] !== '#';
  };
  const gnow = Date.now() / 1000;
  const ginterval = 0.1;

  switch (tekito.gtype) {
    case 'random': {
    // GhostDataがghostData1のとき
      const random = Math.floor(Math.random() * 4);// 壁は考えていないし、外のWallも考えていない。とりまランダム移動
      // ランダム方向決定
      if (random === 0) {
        tekito.gdirect = 'gUp';
      } else if (random === 1) {
        tekito.gdirect = 'gDown';
      } else if (random === 2) {
        tekito.gdirect = 'gLeft';
      } else {
        tekito.gdirect = 'gRight';
      }
      break;
    }
    case 'chase': { // 追跡型方向決定.x,y座標の違いを比較して大きい方に動かす
      const dx = tekito.gx - playerData.x
      const dy = tekito.gy - playerData.y
      if (Math.abs(dx) >= Math.abs(dy)) { // xのほうが差が大きい
        if (dx >= 0) { // playerからみてx正に幽霊がいるとき、方向を左側にする
          tekito.gdirect = 'gLeft';
        } else {
          tekito.gdirect = 'gRight';
        }
      } else {
        if (dy >= 0) { //  幽霊がplayerのしたにあるとき
          tekito.gdirect = 'gUp';
        } else {
          tekito.gdirect = 'gDown';
        }
      }
      break;
    }
    default:
      throw new Error('Unknown GhostType');
  }

  // 座標と動きもろもろ.ここはghostDataで123の区別はつかないのか.ghostDataにghostData1,2,3をいれたい

  if (gnow - tekito.gstart < ginterval) {
    tekito.gx = (tekito.gtargetX - tekito.gpreX)
    * ((gnow - tekito.gstart) / ginterval) + tekito.gpreX; // なめらか移動
    tekito.gy = (tekito.gtargetY - tekito.gpreY)
    * ((gnow - tekito.gstart) / ginterval) + tekito.gpreY;
  } else { // 到着したとき
    tekito.gstart = gnow;
    tekito.gpreX = tekito.gtargetX;
    tekito.gpreY = tekito.gtargetY;
    switch (tekito.gdirect) {
      case 'gUp':
        tekito.gtargetX = tekito.gpreX;
        tekito.gtargetY = tekito.gpreY - 1; // →をx正,↓をy正として考えていることに注意
        break;
      case 'gDown':
        tekito.gtargetX = tekito.gpreX;
        tekito.gtargetY = tekito.gpreY + 1;
        break;
      case 'gLeft':
        tekito.gtargetX = tekito.gpreX - 1;
        tekito.gtargetY = tekito.gpreY;
        break;
      case 'gRight':
        tekito.gtargetX = tekito.gpreX + 1;
        tekito.gtargetY = tekito.gpreY;
        break;
      default:
        throw new Error('ghostDirectionErrorです');
    }
    if (!checkCollisionWall(tekito.gtargetX, tekito.gtargetY)) {
      tekito.gtargetX = tekito.gpreX;
      tekito.gtargetY = tekito.gpreY;
    }
  }
};
