/* eslint-disable max-len */
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';

// プレイヤーがアイテムを所持していない状態でアイテムをゲットしたとき
// プレイヤーの次の位置を取得する
const getItemFromMap = (player: PlayerData, map: MapData) => {
  for (let i = 0; i < map.items.length; i += 1) {
    if (player.preX === map.items[i][0] && player.preY === map.items[i][1]) {
      map.exist[i] = false;
      return i;
    }
  }
  return -1;
};

// プレイヤーが納品した時の処理を書く
const checkNouhin = (player: PlayerData, map: MapData) => (player.x === map.post[0] && player.y === map.post[1]);

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
    // アイテム取得時
    if (getItemFromMap(playerData, mapData) !== -1 && playerData.have === 0) {
      playerData.have += 1;
    }

    // プレイヤーが納品したとき
    if (checkNouhin(playerData, mapData)) {
      playerData.nouhin += playerData.have;
      playerData.have = 0;
    }
  }
  // playerData.x += (playerData.targetX - playerData.preX) * ((t  - start) / interval);
};
