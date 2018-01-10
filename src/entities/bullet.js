/* bullet.js */
import AfterGlow from "./afterGlow.js";
import * as Vector2D from "../vector2D.js";

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
  constructor(pos, vel, color) {
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.afterglow = [];

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders this bullet and its trail on the buffer.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    // Render the afterglow of the bullet
    this.afterglow.forEach(glow => {
      glow.render(ctx);
    });
    // Save the canvas context settings
    ctx.save();
    // Translate and rotate the origin to the center of the bullet
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(Vector2D.angle(this.vel));
    // Set stroke style to the color of the bullet
    ctx.strokeStyle = this.color;
    // Begin drawing bullet
    ctx.beginPath();
    ctx.moveTo(-2, -1);
    ctx.lineTo(2, -1);
    ctx.arc(2, 0, 1, Math.PI * 1.5, Math.PI * 0.5, false);
    ctx.moveTo(2, 1);
    ctx.lineTo(-2, 1);
    ctx.arc(-2, 0, 1, Math.PI * 0.5, Math.PI * 1.5, false);
    // Finish drawing bullet
    ctx.stroke();
    // Restote the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Updates the position of this bullet and its trail.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   *  @return {Boolean}         Whether or not this bullet has hit the edge of the space.
   */
  update(width, height) {
    // Update the afterglow
    for (let j = 0; j < this.afterglow.length; j++) {
      if (!this.afterglow[j].update())
        this.afterglow.splice(j, 1);
    }
    // Add another afterglow image
    this.afterglow.push(new AfterGlow(this.pos, Vector2D.angle(this.vel), Math.round(15 * (Vector2D.norm(this.pos) % 30 + 20) / 50), this.color));
    // Update the position of the bullet
    this.pos = Vector2D.add(this.pos, this.vel);
    // Return whether or not the bullet has reached the edge of the screen
    return !(this.pos.x < width.x || this.pos.x > width.y || this.pos.y < height.x || this.pos.y > height.y);
  }
}
