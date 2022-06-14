import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { settings } from '../settings';

export const playerInitializer = (playerData: PlayerData, mapData: MapData) => {
  window.addEventListener('keydown', (e) => {
    if (settings.mode !== 'game') return;
    switch (e.key) {
      case 'ArrowUp':
        playerData.y -= 1;
        break;
      case 'ArrowDown':
        playerData.y += 1;
        break;
      case 'ArrowLeft':
        playerData.x -= 1;
        break;
      case 'ArrowRight':
        playerData.x += 1;
        break;
      default:
        break;
    }
    if (playerData.y < 0) playerData.y = 0;
    else if (playerData.y >= mapData.height) {
      playerData.y = mapData.height - 1;
    } else if (playerData.x < 0) playerData.x = 0;
    else if (playerData.x >= mapData.width) playerData.x = mapData.width - 1;
  });
};
