const waves = [
  { el: document.getElementById("w1"), speed: 0.15 },
  { el: document.getElementById("w2"), speed: 0.1 },
  { el: document.getElementById("w3"), speed: 0.18 },
  { el: document.getElementById("w4"), speed: 0.08 }
];

let t = 0;

function animate() {
  t += 0.01;
  waves.forEach((w, i) => {
    const offset = Math.sin(t + i) * 30;
    w.el.setAttribute(
      "transform",
      `translate(${offset}, 0)`
    );
  });
  requestAnimationFrame(animate);
}

animate();
