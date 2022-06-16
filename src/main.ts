import './style.css';
import { mapData1 } from './data/mapData';
import { mapRender } from './renderer/mapRender';
import { playerRender } from './renderer/playerRender';
import { settings } from './settings';

import { GhostData, PlayerData } from './DataType';

import { playerMover } from './mover/playerMover';
import { playerInitializer } from './initializer/playerInitializer';


const ghostData: GhostData = {
  ghostx: 30;
  ghosty: 30; //ghostの初期位置
  ghostspeed: 1;
}
function ghostmove(){ //数秒おきに移動する
setTimeout(ghostroop(),ghostspeed*1000)
}


function ghostroop(){//ある方向に一マス移動する
  while(Mode=='game'){
    var random = Math.floor( Math.random() * 4 );//壁は考えていないし、外のWallも考えていない。とりまランダム移動
    if (random==0);
    ghostx+=1
    else if (random==1);
    ghostx-=1
    else if (random==2);
    ghosty+=1
    else;
    ghosty-=1
  }
}

ghostmove();


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

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
