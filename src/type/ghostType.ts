import { GhostData } from '../data/ghostData';
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { checkCollisionWall } from '../mover/ghostMover';

export const ghostType = (tekito: GhostData, playerData: PlayerData, mapData: MapData) => { // 壁の向きにいかないように
  const walldirect = (tekito: GhostData, mapData: MapData) =>{
    if (!checkCollisionWall(tekito.gx, tekito.gy - 1, mapData)) { // どの壁に向かうとき？→上。壁にいったら距離を10000にする
      tekito.up = 10000;
    } else if (!checkCollisionWall(tekito.gx, tekito.gy + 1, mapData)) { // 下
      tekito.down = 10000;
    } else if (!checkCollisionWall(tekito.gx - 1, tekito.gy, mapData)) { // left
      tekito.left = 10000;
    } else (!checkCollisionWall(tekito.gx + 1, tekito.gy, mapData)) { // riget
      tekito.right = 10000;
    }
  };
  const backdirect = (tekito: GhostData) =>{ // 来た道に戻らないように
    if (tekito.gdirect === 'gUp') { // 今来たマスでの距離を9999にする
      tekito.down = 9999;
    } else if (tekito.gdirect === 'gDown') {
      tekito.up = 9999;
    } else if (tekito.gdirect === 'gLeft') {
      tekito.right = 9999;
    } else (tekito.gdirect === 'gRight') {
      tekito.left = 9999;
    }
  };
  
  switch (tekito.gtype) {
    case 'random': {       // GhostDataがghostData1のとき
      walldirect(tekito, mapData)
      backdirect(tekito)
      // 距離の最小値を取ろう。距離は考えてないので追跡はしない
      if (Math.min(tekito.up,tekito.down,tekito.left,tekito.right) === tekito.up) {
        tekito.gdirect ='gUp'
      }else if (Math.min(tekito.up,tekito.down,tekito.left,tekito.right) === tekito.down) {
          tekito.gdirect ='gDown'
      }else if (Math.min(tekito.up,tekito.down,tekito.left,tekito.right) === tekito.left) {
          tekito.gdirect ='gLeft'
      }else (Math.min(tekito.up,tekito.down,tekito.left,tekito.right) === tekito.right) {
          tekito.gdirect ='gRight'
      }
      tekito.up =0;
      tekito.down = 0;
      tekito.left = 0;
      tekito.right = 0;

      const random = Math.floor(Math.random() * 4);
      // ランダム方向決定。壁がある方向と来た方向に高い点（距離）を与える

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
    case 'chase': { // 追跡型方向決定.x,y座標の違いを比較して大きい方に動かす.
      const dx = tekito.gx - playerData.x;
      const dy = tekito.gy - playerData.y;
      if (Math.abs(dx) >= Math.abs(dy)) { // xのほうが差が大きい
        if (dx >= 0) { // playerからみてx正に幽霊がいるとき、方向を左側にする
          tekito.gdirect = 'gLeft';
        } else {
          tekito.gdirect = 'gRight';
        }
      } else if (dy >= 0) { //  幽霊がplayerのしたにあるとき
        tekito.gdirect = 'gUp';
      } else {
        tekito.gdirect = 'gDown';
      }
      break;
    }
    default:
      throw new Error('Unknown GhostType');
  }
};
