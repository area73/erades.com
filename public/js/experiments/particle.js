import {Vector} from './vector.js';

class Particle {
  constructor ({point= {x:0, y:0}, velocity= {x:0, y:0}, acceleration= {x:0, y:0}} = {}) {
    this.position = point;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  move() {
    this.velocity.add(this.acceleration);
    // Add our current velocity to our position
    this.position.add(this.velocity);
  }
}

export {Particle}
