import { PlayerData } from '../data/playerData';
import { MapData } from '../data/mapData';
import { GhostData } from '../data/ghostData';
import { stageReset } from '../controller/stageController';

export const gameInitializer = (playerData :PlayerData, mapData :MapData, ghostData:GhostData) => {
  playerData.x = 10;
  playerData.y = 10;
  playerData.targetX = 10;
  playerData.targetY = 10;
  playerData.preX = 10;
  playerData.preY = 10;
  ghostData.gx = 5;
  ghostData.gy = 5;
  ghostData.gtargetX = 5;
  ghostData.gtargetY = 5;
  ghostData.gpreX = 5;
  ghostData.gpreY = 5;

  stageReset();
};
