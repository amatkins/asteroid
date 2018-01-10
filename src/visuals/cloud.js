/* cloud.js */
import * as Vector2D from "../vector2D.js";

/** @class Cloud
 *  A dust cloud visual effect.
 *  @type {Cloud}
 */
export default class Cloud {
  /** @constructor
   *  Constructs a new 'cloud' visual effect.
   *  @param  {Object} pos    The position of the cloud.
   *  @param  {Number} rad    The radius of the the cloud.
   *  @param  {Number} life   The duration of the cloud.
   *  @param  {Array}  colors The colors of the cloud.
   */
  constructor(pos, rad, life, dens, colors) {
    this.pos = pos;
    this.colors = colors;
    this.dens = dens;
    this.life = life;
    this.maxLife = life;
    this.rad = rad;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the cloud on the buffer.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    let length = this.life / this.maxLife * this.rad;
    let density = (this.life / this.maxLife) * this.dens;
    let pPos = Vector2D.construct(0, 0);

    // Save canvas settings
    ctx.save();
    // Translate origin to cloud center
    ctx.translate(this.pos.x, this.pos.y);
    // Fill clouds with particles
    for (let p = 0; p < density; p++) {
      // Set fill color to a random color
      ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
      // Place the particle in a random place in the circle
      pPos = Vector2D.construct(
        length * 0.1 + Math.random() * length * 0.9,
        Math.random() * 2 * Math.PI,
        false);
      // Draw particle
      ctx.fillRect(pPos.x, pPos.y, 1, 1);
    }
    // Restore canvas settings
    ctx.restore();
  }

  /** @function update
   *  Decrement the duration of this twinkle.
   *  @return {Boolean}   True if this twinkle remains, false if it 'dies'.
   */
  update() {
    this.life--;
    return this.life;
  }
}
