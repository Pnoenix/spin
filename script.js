// Parse URL
const params = new URLSearchParams(window.location.search);
const seed = parseInt(params.get('seed')) || 0;
const path = window.location.pathname.split('/').pop();
const options = decodeURIComponent(path).replace(/\.html$/, '').split('+');

// Simple seeded RNG
function mulberry32(a) {
  return function() {
    var t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(seed);

// Draw the wheel
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;
const arc = (2 * Math.PI) / options.length;

options.forEach((opt, i) => {
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.arc(radius, radius, radius, i * arc, (i + 1) * arc);
  ctx.fillStyle = i % 2 ? '#f2b632' : '#f25c54';
  ctx.fill();
  ctx.stroke();
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(i * arc + arc / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = 'black';
  ctx.font = '16px sans-serif';
  ctx.fillText(opt, radius - 10, 5);
  ctx.restore();
});

// Deterministic spin result
const resultIndex = Math.floor(rand() * options.length);
const result = options[resultIndex];

// Display result on click
document.getElementById('spin').addEventListener('click', () => {
  document.getElementById('result').innerText = `Result: ${result}`;
});
