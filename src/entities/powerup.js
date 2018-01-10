/* pickup.js */
import * as Vector2D from "../vector2D.js";

/** @class Powerup
 *  Upgrades that can be picked up from the field.
 *  @type {Powerup}
 */
export default class Powerup {
  /** @constructor
   *  Construct a new instance of a powerup
   *  @param {Object} pos   The position of the powerup.
   *  @param {Number} rad   The radius of the powerup.
   *  @param {String} tag   The type of powerup.
   *  @param {String} color The color of the powerup.
   */
  constructor(pos, rad, tag, color) {
    this.pos = pos;
    this.rad = rad;
    this.tag = tag;
    this.color = color;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the pickup on the buffer.
   *  @param  {CanvasContext} ctx   The buffer to render on.
   */
  render(ctx) {
    // Save the canvas context settings
    ctx.save();
    // Set the fill color to the color of this powerup
    ctx.fillStyle = this.color;
    // Begin drawing the powerup
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI, false);
    // Finish drawing the powerup
    ctx.fill();
    // Reserve the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Determine if the pickup has been picked up.
   *  @return {Boolean}    The tag of the pickup or null.
   */
  update(pos, l) {
    if (Vector2D.norm(Vector2D.sub(pos, this.pos)) < this.rad + l)
      return this.tag;
  }
}
