import './style.css';
import { mapRender } from './renderer/mapRender';
import { playerRender } from './renderer/playerRender';
import { settings } from './settings';
import { playerMover } from './mover/playerMover';
import { playerInitializer } from './initializer/playerInitializer';
import { getCurrentMap } from './controller/stageController';

const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const playerData = {
    x: 0,
    y: 0,
  };

  // const nowMap = mapData1;
  playerInitializer(playerData);

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nowMap = getCurrentMap()
    console.log(nowMap);

    switch (settings.mode) {
      case 'title':
        // title rendering
        break;
      case 'game':
        
        playerMover(playerData);

        mapRender(nowMap, ctx);
        playerRender(playerData, nowMap, ctx);
        break;
      case 'result':
        // result rendering
        break;
      default:
        throw new Error('Unknown mode');
    }
  };

  tick();
};

Hackathon();
