import { GhostData } from '../data/ghostData';
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { checkCollisionWall } from '../mover/ghostMover';

interface AroundValue {
    left: number;
    right: number;
    up: number;
    down: number;
}

export const ghostType = (tekito: GhostData, playerData: PlayerData, mapData: MapData, arroundvalue: AroundValue) => { // 壁の向きにいかないよ
    const walldirect = (aroundvalue: AroundValue, tekito: GhostData, mapData: MapData) =>{
        if (!checkCollisionWall(tekito.gx, tekito.gy - 1, mapData)) { // どの壁に向かうとき？→上。壁にいったら距離を10000にする
          aroundvalue.up = 10000;
        } else if (!checkCollisionWall(tekito.gx, tekito.gy + 1, mapData)) { // 下
          aroundvalue.down = 10000;
        } else if (!checkCollisionWall(tekito.gx - 1, tekito.gy, mapData)) { // left
          aroundvalue.left = 10000;
        } else (!checkCollisionWall(tekito.gx + 1, tekito.gy, mapData)) { // right
          aroundvalue.right = 10000;
        }
    };
    const backdirect = (aroundvalue: AroundValue, tekito: GhostData) =>{ // 来た道に戻らないように
        if (tekito.gdirect === 'gUp') { // 今来たマスでの距離を9999にする
          aroundvalue.down = 9999;
        } else if (tekito.gdirect === 'gDown') {
          aroundvalue.up = 9999;
        } else if (tekito.gdirect === 'gLeft') {
          aroundvalue.right = 9999;
        } else (tekito.gdirect === 'gRight') {
          aroundvalue.left = 9999;
        }
    };
    const checkAroundValue = () => { // 壁と来た道の値を無限大にする
        const aroundvalue: AroundValue = {
            left: Math.floor(Math.random() * (-100)),
            right: Math.floor(Math.random() * (-100)),
            up: Math.floor(Math.random() * (-100)),
            down: Math.floor(Math.random() * (-100)), // 負の値からランダムな初期距離を代入
        };
        walldirect (aroundvalue, tekito, mapData);
        backdirect (aroundvalue, tekito);
    };
    const MinDirectJudge = (distance: AroundValue, ghostData: GhostData) => {  // どれが最短か
        if (Math.min(distance.up,distance.down,distance.left,distance.right) === distance.up) {
            ghostData.gdirect ='gUp'
        }else if (Math.min(distance.up,distance.down,distance.left,distance.right) === distance.down) {
            ghostData.gdirect ='gDown'
        }else if (Math.min(distance.up,distance.down,distance.left,distance.right) === distance.left) {
            ghostData.gdirect ='gLeft'
        }else (Math.min(distance.up,distance.down,distance.left,distance.right) === distance.right) {
            ghostData.gdirect ='gRight'
        }
    };

  switch (tekito.gtype) {
    case 'random': {       // GhostDataがghostData1のとき
      checkAroundValue();
      // 距離の最小値を取ろう。距離は考えてないので追跡はしない
      MinDirectJudge(arroundvalue,tekito);
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
