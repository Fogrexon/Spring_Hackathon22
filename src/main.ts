import './style.css';
import { mapData } from './mapData';
import { MapController } from './controller/MapController';
import { PlayerController } from './controller/PlayerController';
import { settings } from './settings';
import { PlayerData } from './DataType';

const playerData: PlayerData = {
  x: 0,
  y: 0,
};

const Hackathon = () => {
  const canvas = document.getElementById('cnv') as HTMLCanvasElement;
  if (!canvas) throw new Error('Canvas not found');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not found');

  const mapController = new MapController(mapData);
  const playerController = new PlayerController(playerData, mapData);

  //keydownイベントが起こったときの画面遷移
  //諸々の処理はこれから書きます。
  window.addEventListener('keydown',(e) => {
    switch(settings.mode){
      case 'title':{
        switch(e.key){
          case ' ':
            settings.mode='game';
            break;
          case '1':
            break;
          case '2':
            break;
          case '3':
            break;
          default:
            break;
        }
        break;
      }
      case 'game':
        break;
      case 'result':{
        switch(e.key){
          case ' ':
            settings.mode='title';
            break;
          default:
            break;
        }
        break;
      }

    }
    }
  )

  //clickイベントがあるときの処理(スタート画面でどこかをクリックするとゲーム画面に飛ぶ)
  canvas.addEventListener('click',() => {
    if(settings.mode=='title'){
      settings.mode='game';
    }
    },true
  )

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (settings.mode) {
      case 'title':
        // title rendering
        const COL_TEXT="rgba(0,0,0,1)";//テキストの色

        ctx.fillStyle=COL_TEXT;
        ctx.font='32px sans-serif';
        ctx.fillText('Game Title',220,50);
        ctx.font='16px sans-serif';
        ctx.fillText('Start -> Press space key',220,290);
        ctx.fillText('Tutorial -> Press 1 key',220,320);
        ctx.fillText('Config -> Press 2 key',220,350);
        ctx.fillText('Character select -> Press 3 key',220,380);

        break;
      case 'game':
        mapController.render(ctx);
        playerController.render(ctx);
        break;
      case 'result':
        // result rendering
        ctx.font='32px sans-serif';
        ctx.fillText('Your got <score> points!!',100,100);
        ctx.fillText('Press space to back to Start',100,200);
        break;
      default:
        throw new Error('Unknown mode');
    }
  };

  tick();
};

Hackathon();
