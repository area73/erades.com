export class Vector {
  constructor({ x = 0, y = 0 } = { x: 0, y: 0 }) {
    this.x = x;
    this.y = y;
  }

  // TODO refactor
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  fromAngle(angle, magnitude) {
    return new Vector({
      x: magnitude * Math.cos(angle),
      y: magnitude * Math.sin(angle),
    });
  }
}
