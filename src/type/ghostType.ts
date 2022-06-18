import { GhostData } from '../data/ghostData';
import { PlayerData } from '../data/playerData';

export const ghostType = (tekito: GhostData, playerData: PlayerData) => {
  switch (tekito.gtype) { // ↑↑↑怪しい
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
