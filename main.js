let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let blueCircleX = 50;
let blueCircleY = 50;
let blueCircleSpeed = 2;

let orangeCircleRadius = 30;
let orangeCircleX =
  Math.random() * (canvas.width - 2 * orangeCircleRadius) + orangeCircleRadius;
let orangeCircleY =
  Math.random() * (canvas.height - 2 * orangeCircleRadius) + orangeCircleRadius;

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move blue circle toward the mouse
  let deltaX = mouseX - blueCircleX;
  let deltaY = mouseY - blueCircleY;
  let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance > 0) {
    blueCircleX += (deltaX / distance) * blueCircleSpeed;
    blueCircleY += (deltaY / distance) * blueCircleSpeed;
  }

  // Draw blue circle
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(blueCircleX, blueCircleY, 20, 0, 2 * Math.PI);
  ctx.fill();

  // Draw orange circle
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(orangeCircleX, orangeCircleY, orangeCircleRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Check for collision with the orange circle
  distance = Math.sqrt(
    (blueCircleX - orangeCircleX) ** 2 + (blueCircleY - orangeCircleY) ** 2
  );
  if (distance < 20 + orangeCircleRadius) {
    // Teleport the orange circle to a new random location
    orangeCircleX =
      Math.random() * (canvas.width - 2 * orangeCircleRadius) +
      orangeCircleRadius;
    orangeCircleY =
      Math.random() * (canvas.height - 2 * orangeCircleRadius) +
      orangeCircleRadius;
  }

  requestAnimationFrame(update);
}

// Update mouse position on mousemove
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - canvas.getBoundingClientRect().left;
  mouseY = event.clientY - canvas.getBoundingClientRect().top;
});

requestAnimationFrame(update);
