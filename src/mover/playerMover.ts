/* eslint-disable max-len */
import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { GhostData } from '../data/ghostData';
import { settings } from '../settings';
import { moveNextMap } from '../controller/stageController';

// プレイヤーがアイテムを所持していない状態でアイテムをゲットしたとき
// プレイヤーの次の位置を取得する
const getItemFromMap = (player: PlayerData, map: MapData) => {
  for (let i = 0; i < map.items.length; i += 1) {
    if (player.preX === map.items[i][0] && player.preY === map.items[i][1] && player.have === 0) {
      map.exist[i] = false;
      return i;
    }
  }
  return -1;
};

// プレイヤーが納品した時の処理を書く
const checkNouhin = (player: PlayerData, map: MapData) => (player.preX === map.post[0] && player.preY === map.post[1]);

// プレイヤーが幽霊とぶつかったとき（とりあえず幽霊を1体しかいないとする。
const playerMeetsGhost = (player: PlayerData, ghost: GhostData) => (player.preX === ghost.gpreX && player.preY === ghost.gpreY);

export const playerMover = (playerData: PlayerData, mapData: MapData, ghostData: GhostData) => {
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

    // プレイヤーが幽霊とぶつかったとき、リザルト画面に飛ぶ
    if (playerMeetsGhost(playerData, ghostData)) {
      settings.mode = 'result';
    }
    // プレイヤーがクリアした時、次のステージに行けるようにする。
    if (playerData.nouhin === mapData.items.length) {
      playerData.nouhin = 0;
      moveNextMap();
    }
  }
  // playerData.x += (playerData.targetX - playerData.preX) * ((t  - start) / interval);
};
