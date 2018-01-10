/* explosion.js */
import * as Vector2D from "../vector2D.js";

/** @class Explosion
 *  An explosion with a variable number of arms.
 *  @type {Explosion}
 */
export default class Explosion {
  /** @constructor
   *  Constructs a new explosion visual effect.
   *  @param  {Object}   pos  The position of the explosion.
   *  @param  {Number}   ang  The angle of orientation for the explosion.
   *  @param  {Number}   life The duration that the explosion will appear on screen.
   */
  constructor(pos, ang, life) {
    this.pos = pos;
    this.ang = ang;
    this.bra = 5 + Math.round(Math.random() * 5);
    this.life = life;
    this.maxLife = life;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the explosion effect on the buffer.
   *  @param  {CanvasContext} ctx   The buffer to render on.
   */
  render(ctx) {
    let ang, pos;

    // Save the canvas context settings
    ctx.save();
    // Translate and rotate the origin to the location of the explosion
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.ang);
    // Set stroke color to a transparent white
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    // Begin drawing explosion
    ctx.beginPath();
    // Draw each
    for (let j = 0; j < this.bra; j++) {
      // Determine the angle of the branch
      ang = (j / this.bra) * 2 * Math.PI;
      // Move to starting position of the branch
      pos = Vector2D.construct(3, ang, false);
      ctx.moveTo(pos.x, pos.y);
      // Draw to ending position of the branch
      pos = Vector2D.construct(3 + ((this.maxLife - this.life) / this.maxLife) * 9, ang, false);
      ctx.lineTo(pos.x, pos.y);
    }
    // Finish drawing explosion
    ctx.stroke();
    // Restore the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Decrements the duration of this explosion.
   *  @return {Boolean}    True if the explosion remains, false if it 'dies'.
   */
  update() {
    this.life--;
    return this.life;
  }
}
