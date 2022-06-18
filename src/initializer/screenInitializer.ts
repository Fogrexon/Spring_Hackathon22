import { settings } from '../settings';

export const titleKeydownEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (settings.mode === 'title') {
      if (e.key === ' ') settings.mode = 'game';
    }
  });
};

export const resultKeydownEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (settings.mode === 'result') {
      if (e.key === ' ') settings.mode = 'title';
    }
  });
};

export const result2KeydownEvent = () => {
  window.addEventListener('keydown', (e) => {
    if (settings.mode === 'result2') {
      if (e.key === ' ') settings.mode = 'title';
    }
  });
};
