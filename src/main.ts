import './style.css';
import { mapData } from './mapData';
import { MapController } from './controller/MapController';
import { PlayerController } from './controller/PlayerController';
import { settings } from './settings';
import { GhostData, PlayerData } from './DataType';

const playerData: PlayerData = {
  x: 0,
  y: 0,
};

const ghostData: GhostData = {
  ghostx: 30;
  ghosty: 30; //ghostの初期位置
  ghostspeed: 1;
}
function ghostmove(){ //数秒おきに移動する
setTimeout(ghostroop(),ghostspeed*1000)
}


function ghostroop(){//ある方向に一マス移動する
  for 
  var random = Math.floor( Math.random() * 4 );
  if (random==0);
  ghostx+=1
  else if (random==1);
  ghostx-=1
  else if (random==2);
  ghosty+=1
  else;
  ghosty-=1
}


const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const mapController = new MapController(mapData);
  const playerController = new PlayerController(playerData, mapData);

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (settings.mode) {
      case 'title':
        // title rendering
        break;
      case 'game':
        mapController.render(ctx);
        playerController.render(ctx);
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
