import { getImage } from '../imageloader/imageStore';

export const titleRendering = (ctx:CanvasRenderingContext2D) => {
  const titleImage = getImage('title');
  const { width, height } = ctx.canvas;
  const aspect = titleImage.width / titleImage.height;
  const x = (height * aspect - width) / 2;
  ctx.drawImage(titleImage, -x, 0, height * aspect, height);
};

export const resultRendering = (ctx:CanvasRenderingContext2D) => {
  const resultImage = getImage('result');
  const { width, height } = ctx.canvas;
  const aspect = resultImage.width / resultImage.height;
  const x = (height * aspect - width) / 2;
  ctx.drawImage(resultImage, -x, 0, height * aspect, height);
};

export const result2Rrendering = (ctx:CanvasRenderingContext2D) => {
  const gameoverImage = getImage('gameover');
  const { width, height } = ctx.canvas;
  const aspect = gameoverImage.width / gameoverImage.height;
  const x = (height * aspect - width) / 2;
  ctx.drawImage(gameoverImage, -x, 0, height * aspect, height);
};
