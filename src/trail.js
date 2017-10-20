/* trail.js */

/** @class Trail
 *  A laser afterglow trail particle.
 *  @type {Trail}
 */
export default class Trail {
  /** @constructor
   *  Constructs a new "trail" visual effect.
   *  @param  {Vector2D} pos  The position for the trail.
   *  @param  {Number}   ang  The angle of orientation for the trail.
   *  @param  {Number}   life The duration that the trail will appear on screen.
   */
  constructor(pos, ang, life) {
    this.pos = pos;
    this.ang = ang;
    this.life = life;
    this.maxLife = life;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the trail effect on the buffer.
   *  @param  {CanvasContext} ctx   The buffer to render on.
   */
  render(ctx) {
    var per = this.life / this.maxLife;

    ctx.save();

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.ang);
    ctx.moveTo(-2 * per, -1 * per);
    ctx.lineTo(2 * per, -1 * per);
    ctx.arc(2 * per, 0, 1 * per, Math.PI * 1.5, Math.PI * 0.5, false);
    ctx.moveTo(2 * per, 1 * per);
    ctx.lineTo(-2 * per, 1 * per);
    ctx.arc(-2 * per, 0, 1 * per, Math.PI * 0.5, Math.PI * 1.5, false);
    ctx.stroke();

    ctx.restore();
  }

  /** @function update
   *  Decrements the duration of this trail.
   *  @return {Boolean}    True if the trail remains, false if it 'dies'.
   */
  update() {
    this.life--;
    if (this.life > 0)
      return true;
    else
      return false;
  }
}
