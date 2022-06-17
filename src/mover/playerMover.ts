/* eslint-disable max-len */
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';

// プレイヤーがアイテムをゲットした時の処理を書く必要がある。
// プレイヤーが納品した時の処理を書く
export const playerMover = (playerData: PlayerData, mapData: MapData) => {
  // noting to do
  const checkCollisionWall = (x:number, y:number) => {
    const { width } = mapData;
    return mapData.data[y * width + x] !== '#';
  };

  // 現在押されているキーがあるとき、その方向にtargetを設定する。そうでないときはtargetを現在位置にする。

  // targetの方向にキャラクターを動かす
  const now = Date.now() / 1000;
  const interval = 0.1;
  // now - start < intervalのとき
  if (now - playerData.start < interval) {
    playerData.x = (playerData.targetX - playerData.preX) * ((now - playerData.start) / interval) + playerData.preX;
    playerData.y = (playerData.targetY - playerData.preY) * ((now - playerData.start) / interval) + playerData.preY;
  } else {
    playerData.start = now;
    playerData.preX = playerData.targetX;
    playerData.preY = playerData.targetY;
    switch (playerData.direction) {
      case 'ArrowUp':
        playerData.targetX = playerData.preX;
        playerData.targetY = playerData.preY - 1;
        break;
      case 'ArrowDown':
        playerData.targetX = playerData.preX;
        playerData.targetY = playerData.preY + 1;
        break;
      case 'ArrowLeft':
        playerData.targetX = playerData.preX - 1;
        playerData.targetY = playerData.preY;
        break;
      case 'ArrowRight':
        playerData.targetX = playerData.preX + 1;
        playerData.targetY = playerData.preY;
        break;
      default:
        break;
    }
    if (!checkCollisionWall(playerData.targetX, playerData.targetY)) {
      playerData.targetX = playerData.preX;
      playerData.targetY = playerData.preY;
    }
  }
  // playerData.x += (playerData.targetX - playerData.preX) * ((t  - start) / interval);
};
