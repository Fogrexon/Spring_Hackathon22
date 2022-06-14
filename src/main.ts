import './style.css';
import { mapData1 } from './data/mapData';
import { mapRender } from './renderer/mapRender';
import { playerRender } from './renderer/playerRender';
import { settings } from './settings';

import { Drawing } from './screenDrawing';

import { playerMover } from './mover/playerMover';
import { playerInitializer } from './initializer/playerInitializer';

const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const playerData = {
    x: 0,
    y: 0,
  };

  const nowMap = mapData1;
  playerInitializer(playerData, nowMap);

  // keydownイベントが起こったときの画面遷移
  Drawing.keyPress(); // from ./screenDrawing.ts

  // clickイベントがあるときの処理
  Drawing.onClick(); // from ./screenDrawing.ts
  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (settings.mode) {
      case 'title': {
        // title rendering
        Drawing.titleDrawing(ctx); // from ./screenDrawing.ts
        break;
      }
      case 'game':
        playerMover(playerData);
        mapRender(nowMap, ctx);
        playerRender(playerData, nowMap, ctx);
        break;
      case 'result':
        // result rendering
        Drawing.resultDrawing(ctx); // from ./screenDrawing.ts
        break;
      default:
        throw new Error('Unknown mode');
    }
  };

  tick();
};

Hackathon();
