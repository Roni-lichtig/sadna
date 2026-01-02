const canvas = document.getElementById("waves-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let t = 0;

function drawWave(offsetY, amplitude, thickness, speed, opacity) {
  ctx.beginPath();
  ctx.moveTo(-200, offsetY);

  for (let x = -200; x < canvas.width + 200; x += 60) {
    const y =
      offsetY +
      Math.sin((x + t * speed) * 0.01) * amplitude +
      Math.sin((x + t * speed) * 0.005) * (amplitude * 0.6);

    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = `rgba(44,128,255,${opacity})`;
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // קווים לא מסודרים, באלכסון ובשכבות
  drawWave(canvas.height * 0.2, 40, 2.5, 0.8, 0.35);
  drawWave(canvas.height * 0.3, 55, 3, 0.6, 0.25);
  drawWave(canvas.height * 0.45, 70, 3.5, 0.4, 0.18);
  drawWave(canvas.height * 0.6, 50, 2.5, 0.7, 0.22);
  drawWave(canvas.height * 0.75, 65, 3, 0.5, 0.15);

  t += 0.6;
  requestAnimationFrame(animate);
}

animate();
