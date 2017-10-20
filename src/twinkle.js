/* twinkle.js */

/** @class Twinkle
 *  A twinkling star visual effect.
 *  @type {Twinkle}
 */
export default class Twinkle {
  /** @constructor
   *  Constructs a new 'twinkle' visual effect.
   *  @param  {Number} x    The x coordinate for the twinkle.
   *  @param  {Number} y    The y coordinate for the twinkle.
   *  @param  {Number} size The size of the the twinkle.
   *  @param  {Number} life The duration of the twinkle.
   */
  constructor(x, y, size, life) {
    this.x = x;
    this.y = y;
    this.life = life;
    this.maxLife = life;
    this.size = size;

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function render
   *  Renders the twinkle on the buffer.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    var length = this.life / this.maxLife * this.size;

    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(this.x - length / 2, this.y - length / 2, length, length);
    ctx.restore();
  }

  /** @function update
   *  Decrement the duration of this twinkle.
   *  @return {Boolean}   True if this twinkle remains, false if it 'dies'.
   */
  update() {
    this.life--;
    if (this.life > 0)
      return true;
    else
      return false;
  }
}
