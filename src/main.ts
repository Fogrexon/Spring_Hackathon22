import './style.css';
import { mapData } from './mapData';
import { MapController } from './controller/MapController';
import { PlayerController } from './controller/PlayerController';
import { settings } from './settings';
import { PlayerData } from './DataType';
import { Drawing } from './screenDrawing';

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
        mapController.render(ctx);
        playerController.render(ctx);
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
