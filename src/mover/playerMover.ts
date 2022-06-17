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

  // プレイヤーがアイテムを所持していない状態でアイテムをゲットしたとき
  // プレイヤーの次の位置を取得する
  const playerBoundary = (player: PlayerData) => {
    switch (player.direction) {
      case 'ArrowUp':
        return [player.x, player.y];
      case 'ArrowDown':
        return [player.x, player.y + 1];
      case 'ArrowLeft':
        return [player.x, player.y];
      case 'ArrowRight':
        return [player.x + 1, player.y];
      default:
        return [player.x, player.y];
    }
  };

  const checkGettingItem = (player: PlayerData, map: MapData) => {
    let check = false;
    for (let i = 0; i < map.items.length; i += 1) {
      if (playerBoundary(player) === map.items[i] && player.have === 0) {
        check = true;
      }
    }
    return check;
  };

  if (checkGettingItem(playerData, mapData)) {
    playerData.have += 1;
  }

  // プレイヤーが納品したとき
  const checkNouhin = (player: PlayerData, map: MapData) => {
    let check = false;
    if (playerBoundary(player) === map.post) check = true;
    return check;
  };

  if (checkNouhin(playerData, mapData)) {
    playerData.nouhin += playerData.have;
    playerData.have = 0;
  }
};
