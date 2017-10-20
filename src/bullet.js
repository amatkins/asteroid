/* bullet.js */

import Trail from './trail';
import Vector2D from './vector2D';

/** @class Bullet
 *  A laser bullet that can break asteroids.
 *  @type {Bullet}
 */
export default class Bullet {
  /** @constructor
   *  Constructs a new bullet at the tip of the ship.
   *  @param  {Vector2D} pos  The position to start this bullet.
   *  @param  {Number} vel    The velocity of this bullet.
   */
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.trails = [];

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders this bullet and its trail on the buffer.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    this.trails.forEach((trail) => {
      trail.render(ctx);
    });

    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.vel.dir());

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(-2, -1);
    ctx.lineTo(2, -1);
    ctx.arc(2, 0, 1, Math.PI * 1.5, Math.PI * 0.5, false);
    ctx.moveTo(2, 1);
    ctx.lineTo(-2, 1);
    ctx.arc(-2, 0, 1, Math.PI * 0.5, Math.PI * 1.5, false);
    ctx.stroke();

    ctx.restore();
  }

  /** @function update
   *  Updates the position of this bullet and its trail.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   *  @return {Boolean}         Whether or not this bullet has hit the edge of the space.
   */
  update(width, height) {
    for (let j = 0; j < this.trails.length; j++) {
      if (!this.trails[j].update())
        this.trails.shift();
    }

    this.trails.push(new Trail(this.pos, this.vel.dir(), 10));

    this.pos = this.pos.add(this.vel);

    return !(this.pos.x < width.x || this.pos.x > width.y || this.pos.y < height.x || this.pos.y > height.y);
  }
}
