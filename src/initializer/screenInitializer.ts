import { settings } from '../settings';

export const titleKeydownEvent = () => {
  if (settings.mode === 'title') {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          settings.mode = 'game';
          break;
          // 残りの処理は後で追加します。
        default: // do nothing
      }
    });
  }
};

export const resultKeydownEvent = () => {
  if (settings.mode === 'result') {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
          settings.mode = 'title';
          break;
          // 残りの処理は後で追加します。
        default: // do nothing
      }
    });
  }
};
