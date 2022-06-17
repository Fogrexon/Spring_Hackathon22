/* eslint-disable max-len */
import {
  MapData, mapData1, mapData2, mapData3,
} from '../data/mapData';
import { settings } from '../settings';

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
