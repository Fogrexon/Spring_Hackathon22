import { MapData, PlayerData } from '../DataType';

export class PlayerController {
  private playerData: PlayerData;

  private mapData: MapData;

  constructor(playerData: PlayerData, mapData: MapData) {
    this.playerData = playerData;
    this.mapData = mapData;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.playerData.y -= 1;
          break;
        case 'ArrowDown':
          this.playerData.y += 1;
          break;
        case 'ArrowLeft':
          this.playerData.x -= 1;
          break;
        case 'ArrowRight':
          this.playerData.x += 1;
          break;
        default:
          break;
      }
      if (this.playerData.y < 0) this.playerData.y = 0;
      else if (this.playerData.y >= this.mapData.height) {
        this.playerData.y = this.mapData.height - 1;
      } else if (this.playerData.x < 0) this.playerData.x = 0;
      else if (this.playerData.x >= this.mapData.width) this.playerData.x = this.mapData.width - 1;
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    const {
      x, y,
    } = this.playerData;
    const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
    const dx = canvasWidth / this.mapData.width;
    const dy = canvasHeight / this.mapData.height;
    ctx.fillStyle = '#f00';
    ctx.fillRect(x * dx, y * dy, dx, dy);
  }
}
