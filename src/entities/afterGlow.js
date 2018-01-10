/* afterGlow.js */

/** @class AfterGlow
 *  A laser afterglow particle.
 *  @type {AfterGlow}
 */
export default class AfterGlow {
  /** @constructor
   *  Constructs a new "afterglow" visual effect.
   *  @param  {Object} pos    The position for the afterglow.
   *  @param  {Number}   ang    The angle of orientation for the afterglow.
   *  @param  {Number}   life   The duration that the afterglow will appear on screen.
   *  @param  {String}   color  The color of the afterglow.
   */
  constructor(pos, ang, life, color) {
    this.pos = pos;
    this.ang = ang;
    this.life = life;
    this.maxLife = life;
    this.color = color;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the afterglow effect on the buffer.
   *  @param  {CanvasContext} ctx   The buffer to render on.
   */
  render(ctx) {
    var per = this.life / this.maxLife;

    // Save the canvas context settings
    ctx.save();
    // Translate and rotate the origin to the center of the afterglow
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.ang);
    // Set the stroke color to the saved color
    ctx.strokeStyle = this.color;
    // Begin drawing the afterglow outline
    ctx.beginPath();
    ctx.moveTo(-2 * per, -1 * per);
    ctx.lineTo(2 * per, -1 * per);
    ctx.arc(2 * per, 0, 1 * per, Math.PI * 1.5, Math.PI * 0.5, false);
    ctx.moveTo(2 * per, 1 * per);
    ctx.lineTo(-2 * per, 1 * per);
    ctx.arc(-2 * per, 0, 1 * per, Math.PI * 0.5, Math.PI * 1.5, false);
    // Finish drawing the afterglow
    ctx.stroke();
    // Restore the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Decrements the duration of this afterglow.
   *  @return {Boolean}    True if the afterglow remains, false if it 'dies'.
   */
  update() {
    this.life--;
    return this.life;
  }
}
