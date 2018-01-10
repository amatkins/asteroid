/* twinkle.js */

/** @class Twinkle
 *  A twinkling star visual effect.
 *  @type {Twinkle}
 */
export default class Twinkle {
  /** @constructor
   *  Constructs a new 'twinkle' visual effect.
   *  @param  {Object} pos  The position of the twinkle.
   *  @param  {Number} size The size of the the twinkle.
   *  @param  {Number} life The duration of the twinkle.
   */
  constructor(pos, size, life) {
    this.pos = pos;
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

    // Save the canvas context settings
    ctx.save();
    // Set fill style to white
    ctx.fillStyle = "white";
    // Draw twinkle on background
    ctx.fillRect(this.pos.x - length / 2, this.pos.y - length / 2, length, length);
    // Restore the canvas context settings
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
