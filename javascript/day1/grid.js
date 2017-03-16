/**
 * Point
 * @param x
 * @param y
 * @constructor
 */
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

/**
 * Grid
 * @param origin
 * @constructor
 */

class Grid {
  constructor(origin = new Point()) {
    this.origin = origin;
    this.current = new Point(origin.x,origin.y);
    this.rotation = [1, 0, -1, 0];
  }

  moveRight(blocks) {
    this.current.x += (blocks * this.rotation[0]);
    this.current.y += (blocks * this.rotation[1]);

    this.rotateRight();
  };

  moveLeft(blocks) {
    this.current.x -= (blocks * this.rotation[0]);
    this.current.y -= (blocks * this.rotation[1]);

    this.rotateLeft();
  };

  traceMoveRight(blocks) {
    this.current.x += (blocks * this.rotation[0]);
    this.current.y += (blocks * this.rotation[1]);
  };

  traceMoveLeft(blocks) {
    this.current.x -= (blocks * this.rotation[0]);
    this.current.y -= (blocks * this.rotation[1]);
  };

  rotateRight() {
    const first = this.rotation.shift();
    this.rotation.push(first);
  };

  rotateLeft() {
    const last = this.rotation.pop();
    this.rotation.unshift(last);
  };

  locationHash() {
    return JSON.stringify({x: this.current.x, y: this.current.y});
  }

  calculateDistance() {
    return Math.abs(this.origin.x - this.current.x) + Math.abs(this.origin.y - this.current.y);
  };
}

module.exports = Grid;