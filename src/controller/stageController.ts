import { MapData, mapData1, mapData2, mapData3 } from "../data/mapData"
import { settings } from "../settings"


const stageData = {
  current: 0 as number,
  maps: [
    mapData1,
    mapData2,
    mapData3,
  ] as MapData[]
}

export const moveNextMap = () => {
  // 次のマップに移動
 if(stageData.current < stageData.maps.length - 1 ){
   stageData.current += 1;
 }
  // 最後のマップの場合はresult画面に移動
  else {
    settings.mode = "result";
  }
};

export const getCurrentMap = () => {
  // 現在のマップを取得
  return stageData.maps[stageData.current];
}
