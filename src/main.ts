import './style.css';
import { mapData } from './mapData';
import { MapController } from './controller/MapController';
import { PlayerController } from './controller/PlayerController';
import { settings } from './settings';

const playerData = {
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

  const tick = () => {
    requestAnimationFrame(tick);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch(settings.mode) {
      case 'title':
        break;
      case 'game':
        mapController.render(ctx);
        playerController.render(ctx);
        break;
      case 'result':
        break;
      default:
        throw new Error('Unknown mode');
    }
  };

  tick();
};

Hackathon();
