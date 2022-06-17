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


//const ghostData: GhostData = {
//  ghostx: 30,
//  ghosty: 30, // ghostの初期位置
//  ghostspeed: 1,
//};
ghostx =30
ghosty =30


const ghostloop = function () {// ある方向に一マス移動する
  const random = Math.floor(Math.random() * 4);// 壁は考えていないし、外のWallも考えていない。とりまランダム移動
  if (random === 0) {
    ghostx += 1;
  } else if (random === 1) {
    ghostx -= 1;
  } else if (random === 2) {
    ghosty += 1;
  } else {
    ghosty -= 1;
  }
};


const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const playerData = {
    x: 1,
    y: 1,
  };

  const nowMap = mapData1;
  playerInitializer(playerData, nowMap);

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
        playerMover(playerData);
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
