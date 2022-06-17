import './style.css';
import { mapData1 } from './data/mapData';
import { mapRender } from './renderer/mapRender';
import { playerRender } from './renderer/playerRender';
import { settings } from './settings';

import { PlayerData } from './data/playerData';

import { playerMover } from './mover/playerMover';
import { playerInitializer } from './initializer/playerInitializer';
import {
  titleRendering, resultRendering,
} from './renderer/screenRenderer';
import { titleKeydownEvent, resultKeydownEvent } from './initializer/screenInitializer';

import { GhostData } from './data/ghostData';
import { ghostMover } from './mover/ghostMover'

const ghostData: GhostData = {
  ghostx: 30,
  ghosty: 30, // ghostの初期位置
  ghostspeed: 1,
};

const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const playerData:PlayerData = {
    x: 1,
    y: 1,
    direction: 'None',
    targetX: 1,
    targetY: 1,
    preX: 1,
    preY: 1,
    start: Date.now() / 1000,
  };

  const nowMap = mapData1;
  playerInitializer(playerData);

  // keydownイベントが起こったときの画面遷移
  titleKeydownEvent(); // from ./screenDrawing.ts
  resultKeydownEvent();

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (settings.mode) {
      case 'title': {
        // title rendering
        titleRendering(ctx); // from ./screenDrawing.ts
        break;
      }
      case 'game':
        playerMover(playerData, nowMap);
        mapRender(nowMap, ctx);
        playerRender(playerData, nowMap, ctx);
        break;
      case 'result':
        // result rendering
        resultRendering(ctx); // from ./screenDrawing.ts
        break;
      default:
        throw new Error('Unknown mode');
    }
  };

  tick();
};

Hackathon();
