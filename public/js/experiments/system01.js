import { setupCanvas, getCtx } from "./canvas.js";
import { Emitter } from "./emitter.js";
import { Vector } from "./vector.js";

const canvas = setupCanvas("canvas");
const ctx = getCtx(canvas);

const maxParticles = 20000;
const particleSize = 1;
const emissionRate = 20;
const objectSize = 3;
let particles = [];
const midX = canvas.width / 2;
const midY = canvas.height / 2;
const emitters = [
  new Emitter(new Vector(midX - 100, midY), Vector.fromAngle(0, 2)),
];
//////////////

// ---> update

function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length > maxParticles) return;
  // for each emitter
  // debugger;
  for (var i = 0; i < emitters.length; i++) {
    // for [emissionRate], emit a particle

    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    }
  }
}

function plotParticles(boundsX, boundsY) {
  // debugger;
  // a new array to hold particles within our bounds
  var currentParticles = [];
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;
    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;
    // Move our particles
    particle.move();
    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }
  // Update our global particles, clearing room for old particles to be collected
  particles = currentParticles;
}

function drawParticles() {
  // Set the color of our particles
  ctx.fillStyle = "rgb(0,0,255)";
  // For each particle
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    // Draw a square at our position [particleSize] wide and tall
    ctx.fillRect(position.x, position.y, particleSize, particleSize);
  }
}
const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

function update() {
  addNewParticles();
  plotParticles(canvas.width, canvas.height);
}

function draw() {
  drawParticles();
  // console.log(particles)
}

const queue = () => window.requestAnimationFrame(loop);

function loop() {
  clear();
  update();
  draw();
  queue();
}

// const loop = R.pipe(queue,draw,update,clear);

loop();
