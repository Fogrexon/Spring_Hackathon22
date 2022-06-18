export const titleRendering = (ctx:CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000';
  ctx.font = '32px sans-serif';
  ctx.fillText('Game Title', 220, 50);
  ctx.font = '16px sans-serif';
  ctx.fillText('Student -> Press 1 key', 220, 290);
  ctx.fillText('Monk -> Press 2 key', 220, 320);
  ctx.fillText('Exorcist -> Press 3 key', 220, 350);
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
