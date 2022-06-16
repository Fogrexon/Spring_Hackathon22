import { MapData } from '../data/mapData';
import { PlayerData } from '../data/playerData';
import { settings } from '../settings';

export const playerInitializer = (playerData: PlayerData, mapData: MapData) => {
  const checkCollisionWall = (x:number, y:number) => {
    const { width } = mapData;
    return mapData.data[y * width + x] !== '#';
  };

  window.addEventListener('keydown', (e) => {
    const { x, y } = playerData;

    if (settings.mode !== 'game') return;
    switch (e.key) {
      case 'ArrowUp':
        if (checkCollisionWall(x, y - 1)) playerData.y -= 1;
        break;
      case 'ArrowDown':
        if (checkCollisionWall(x, y + 1)) playerData.y += 1;
        break;
      case 'ArrowLeft':
        if (checkCollisionWall(x - 1, y)) playerData.x -= 1;
        break;
      case 'ArrowRight':
        if (checkCollisionWall(x + 1, y)) playerData.x += 1;
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
