// Select the canvas and set up the context
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas dynamically on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initWaves(); // Reinitialize waves
});

// Wave properties
let waveArray = []; // Array to hold multiple wave layers
const waveCount = 3; // Number of wave layers

// Function to initialize waves
function initWaves() {
  waveArray = [];
  for (let i = 0; i < waveCount; i++) {
    waveArray.push({
      amplitude: 20 + Math.random() * 30, // Height of the wave
      frequency: 0.01 + Math.random() * 0.02, // Frequency of the wave
      phase: Math.random() * Math.PI * 2, // Starting phase
      speed: 0.02 + Math.random() * 0.03, // Wave speed
      color: `rgba(255, 255, 255, ${0.3 + i * 0.2})`, // Wave color with transparency
    });
  }
}

// Function to draw a single wave
function drawWave(wave) {
  ctx.beginPath();
  for (let x = 0; x < canvas.width; x++) {
    const y =
      canvas.height / 2 +
      wave.amplitude * Math.sin(wave.frequency * x + wave.phase);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height); // Connect to the bottom right corner
  ctx.lineTo(0, canvas.height); // Connect to the bottom left corner
  ctx.closePath();
  ctx.fillStyle = wave.color;
  ctx.fill();
}

// Animation loop
function animate() {
  ctx.fillStyle = "#b9a377"; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw each wave
  waveArray.forEach((wave) => {
    drawWave(wave);
    wave.phase += wave.speed; // Update the wave phase for motion
  });

  requestAnimationFrame(animate); // Continue animating
}

// Initialize and start animation
initWaves();
animate();
