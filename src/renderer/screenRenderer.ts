export const titleRendering = (ctx:CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000';
  ctx.font = '32px sans-serif';
  ctx.fillText('Game Title', 220, 50);
  ctx.font = '16px sans-serif';
  ctx.fillText('Start -> Press space key', 220, 290);
  ctx.fillText('Tutorial -> Press 1 key', 220, 320);
  ctx.fillText('Config -> Press 2 key', 220, 350);
  ctx.fillText('Character select -> Press 3 key', 220, 380);
};

export const resultRendering = (ctx:CanvasRenderingContext2D) => {
  ctx.font = '32px sans-serif';
  ctx.fillStyle = '#000';
  ctx.fillText('Your got <score> points!!', 100, 100);
  ctx.fillText('Press space to back to Start', 100, 200);
};

export const result2Rrendering = (ctx:CanvasRenderingContext2D) => {
  ctx.font = '32px sans-serif';
  ctx.fillStyle = '#000';
  ctx.fillText('You failed...', 100, 100);
  ctx.fillText('Press space to back to Start', 100, 200);
};
