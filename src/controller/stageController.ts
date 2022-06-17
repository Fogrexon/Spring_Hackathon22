/* eslint-disable max-len */
import {
  MapData, mapData1, mapData2, mapData3,
} from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { settings } from '../settings';

// mapData.exist[]を書き換える処理を書く(アイテムが取得されたときに)
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

export const getItemFromMap = (player: PlayerData, map: MapData) => {
  for (let i = 0; i < map.items.length; i += 1) {
    if (playerBoundary(player)[0] === map.items[i][0] && playerBoundary(player)[1] === map.items[i][1]) {
      map.exist[i] = false;
      return i;
    }
  }
  return -1;
};

export const checkNouhin = (player: PlayerData, map: MapData) => {
  if (playerBoundary(player)[0] === map.post[0] && playerBoundary(player)[1] === map.post[1]) return true;
  return false;
};

const stageData = {
  current: 0 as number,
  maps: [
    mapData1,
    mapData2,
    mapData3,
  ] as MapData[],
};

export const moveNextMap = () => {
  // 次のマップに移動
  if (stageData.current < stageData.maps.length - 1) {
    stageData.current += 1;
  } else {
    settings.mode = 'result';
  }
};

export const getCurrentMap = () => stageData.maps[stageData.current];
