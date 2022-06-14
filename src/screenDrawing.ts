/* eslint-disable default-case */
import { settings } from './settings';

export class Drawing {
  static titleDrawing(ctx:CanvasRenderingContext2D) {
    const COL_TEXT = 'rgba(0,0,0,1)';// テキストの色

    ctx.fillStyle = COL_TEXT;
    ctx.font = '32px sans-serif';
    ctx.fillText('Game Title', 220, 50);
    ctx.font = '16px sans-serif';
    ctx.fillText('Start -> Press space key', 220, 290);
    ctx.fillText('Tutorial -> Press 1 key', 220, 320);
    ctx.fillText('Config -> Press 2 key', 220, 350);
    ctx.fillText('Character select -> Press 3 key', 220, 380);
  }

  static resultDrawing(ctx:CanvasRenderingContext2D) {
    ctx.font = '32px sans-serif';
    ctx.fillText('Your got <score> points!!', 100, 100);
    ctx.fillText('Press space to back to Start', 100, 200);
  }

  static onClick() {
    window.addEventListener('click', () => {
      if (settings.mode === 'title') {
        settings.mode = 'game';
      }
    }, false);
  }

  static keyPress() {
    window.addEventListener('keydown', (e) => {
      switch (settings.mode) {
        case 'title': {
          switch (e.key) {
            case ' ':
              settings.mode = 'game';
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
        case 'result': {
          switch (e.key) {
            case ' ':
              settings.mode = 'title';
              break;
            default:
              break;
          }
          break;
        }
      }
    });
  }
}
