import './style.css';

const Hackathon = () => {
  const canvas = document.getElementById('cnv');
  const ctx = canvas.getContext('2d');

  // init

  const tick = () => {
    requestAnimationFrame(tick);
  };

  tick();
};

Hackathon();
