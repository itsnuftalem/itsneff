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
  initClouds();
  initWaves();
  initBirds();
});

// Cloud properties
let cloudArray = [];
const cloudCount = 10;

// Wave properties
let wave = {
  y: canvas.height * 0.75,
  length: 0.02,
  amplitude: 40,
  speed: 0.05,
  points: [],
};

// Bird properties
let birdArray = [];
const birdCount = 50;

// Mouse properties
let mouse = {
  x: 0,
  y: 0,
};

// Initialize clouds
function initClouds() {
  cloudArray = [];
  for (let i = 0; i < cloudCount; i++) {
    cloudArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      radius: 30 + Math.random() * 50,
      speed: 0.5 + Math.random() * 1.5,
      color: `rgba(255, 255, 255, ${0.8 + Math.random() * 0.2})`,
    });
  }
}

// Initialize waves
function initWaves() {
  wave.points = [];
  for (let i = 0; i < canvas.width; i++) {
    wave.points.push({ x: i, y: 0 });
  }
}

// Initialize birds
function initBirds() {
  birdArray = [];
  for (let i = 0; i < birdCount; i++) {
    birdArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      speedX: 1 + Math.random() * 2, // Horizontal speed
      speedY: Math.random() - 0.5, // Slight vertical movement
      size: 5 + Math.random() * 5, // Random bird size
      hoverEffect: false,
    });
  }
}

// Draw clouds
function drawCloud(cloud) {
  const { x, y, radius, color } = cloud;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.arc(x - radius * 0.6, y + radius * 0.4, radius * 0.8, 0, Math.PI * 2);
  ctx.arc(x + radius * 0.6, y + radius * 0.4, radius * 0.8, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw waves
function drawWaves() {
  ctx.beginPath();
  ctx.moveTo(0, wave.y);
  for (let i = 0; i < wave.points.length; i++) {
    const point = wave.points[i];
    const newY =
      wave.y +
      Math.sin(i * wave.length + wave.speed * Date.now() * 0.005) *
        wave.amplitude;
    point.y = newY;
    ctx.lineTo(point.x, point.y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fillStyle = "#6d9cb3";
  ctx.fill();
}

// Draw birds
function drawBird(bird) {
  ctx.beginPath();
  ctx.fillStyle = "black"; // Bird color
  const wingFlap = Math.sin(Date.now() * 0.01 + bird.x) * bird.size; // Wing animation
  ctx.moveTo(bird.x, bird.y);
  ctx.lineTo(bird.x - bird.size, bird.y + wingFlap);
  ctx.lineTo(bird.x - bird.size, bird.y - wingFlap);
  ctx.closePath();
  ctx.fill();
}

// Update clouds
function updateClouds() {
  cloudArray.forEach((cloud) => {
    drawCloud(cloud);
    cloud.x += cloud.speed;
    if (cloud.x - cloud.radius > canvas.width) {
      cloud.x = -cloud.radius;
      cloud.y = Math.random() * canvas.height * 0.5;
    }
  });
}

// Update birds
function updateBirds() {
  birdArray.forEach((bird) => {
    drawBird(bird);

    // Move the bird
    bird.x += bird.speedX;
    bird.y += bird.speedY;

    // Reset position when it flies off-screen
    if (bird.x > canvas.width + bird.size) bird.x = -bird.size;
    if (bird.y > canvas.height || bird.y < 0) bird.y = Math.random() * canvas.height * 0.5;

    // Hover effect: Move away from the mouse
    const distance = Math.hypot(bird.x - mouse.x, bird.y - mouse.y);
    if (distance < 100) {
      const angle = Math.atan2(bird.y - mouse.y, bird.x - mouse.x); // Calculate the angle to move away from mouse
      const speed = 2; // Speed of the birds moving away
      bird.x += Math.cos(angle) * speed; // Move away horizontally
      bird.y += Math.sin(angle) * speed; // Move away vertically
    }
  });
}

// Event listeners
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop
function animate() {
  ctx.fillStyle = "#b9a377";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  updateClouds();
  updateBirds();
  drawWaves();
  requestAnimationFrame(animate);
}

// Initialize and start animation
initClouds();
initWaves();
initBirds();
animate();
