/* explosion.js */

import Vector2D from './vector2D';

/** @class Explosion
 *  An explosion with a variable number of arms.
 *  @type {Explosion}
 */
export default class Explosion {
  /** @constructor
   *  Constructs a new explosion visual effect.
   *  @param  {Vector2D} pos  The position for the explosion.
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
    var ang;

    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.ang);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    for (let j = 0; j < this.bra; j++) {
      ang = (j / this.bra) * 2 * Math.PI;
      ctx.moveTo(3 * Math.cos(ang), 3 * Math.sin(ang));
      ctx.lineTo((3 + ((this.maxLife - this.life) / this.maxLife) * 9) * Math.cos(ang), (3 + ((this.maxLife - this.life) / this.maxLife) * 9) * Math.sin(ang));
    }
    ctx.stroke();

    ctx.restore();
  }

  /** @function update
   *  Decrements the duration of this explosion.
   *  @return {Boolean}    True if the explosion remains, false if it 'dies'.
   */
  update() {
    this.life--;
    if (this.life > 0)
      return true;
    else
      return false;
  }
}
