import { GhostData } from './data/ghostData';

export const ghostMover = () => {// ある方向に一マス移動する
  const random = Math.floor(Math.random() * 4);// 壁は考えていないし、外のWallも考えていない。とりまランダム移動
  if (random === 0) {
    GhostData.ghostx += 1;
  } else if (random === 1) {
    GhostData.ghostx -= 1;
  } else if (random === 2) {
    GhostData.ghosty += 1;
  } else {
    GhostData.ghosty -= 1;
  }
};
