/* ship.js */

import Bullet from './bullet';
import Vector2D from './vector2D';

/** @class Ship
 *  The ship that floats through space and fires a laser periodically.
 *  @type {Ship}
 */
export default class Ship {
  /** @constructor
   *  Constructs a new space vessel.
   *  @param  {Number} width    The width of the visible screen.
   *  @param  {Number} height   The height of the visible screen.
   *  @param  {Number} cellSize The size of the cells that the screen is split into.
   *  @param  {Number} lives    The number of attempts this ship has left.
   */
  constructor (width, height, cellSize, lives) {
    this.pos = new Vector2D(width / 2, height / 2);
    this.ori = 270;
    this.atm = cellSize * (2 / 5);
    this.vel = new Vector2D(0, 0);
    this.lat = "na";
    this.spd = 0;
    this.maxSpd = cellSize * 0.1;
    this.ang = "na";
    this.trq = 0;
    this.lives = lives;
    this.inv = 100;
    this.bullet = null;

    this.pullInput = this.pullInput.bind(this);
    this.stopInput = this.stopInput.bind(this);
    this.render = this.render.bind(this);
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function pullInput
   *  Interprets an input command.
   *  @param  {Object} inp  The input signal and its strength.
   */
  pullInput(inp) {
    switch (inp.sig) {
      case "cw":
      case "ccw":
        this.ang = inp.sig;
        this.trq = inp.str;
        break;
      case "acc":
        this.lat = inp.sig;
        this.spd = inp.str;
        break;
      default:
        break;
    }
  }

  /** @function stopInput
   *  Terminates an input signal if it is the active signal of that class.
   *  @param  {String} inp  The input to stop.
   */
  stopInput(inp) {
    if (inp === this.ang) {
      this.ang = "na";
      this.trq = 0;
    } else if (inp === this.lat) {
      this.lat = "na";
      this.spd = 0;
    }
  }

  /** @function render
   *  Renders this ship on the screen.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    var disA = -1 + Math.round(Math.random() * 2);
    var disB = -1 + Math.round(Math.random() * 2);

    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.ori * Math.PI / 180);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(disA, disB, this.atm, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 255, 255, ${1 * (1 - (this.inv % 20) / 20)})`;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.atm, 0);
    ctx.lineTo(-this.atm * Math.cos(Math.PI / 4), -this.atm * Math.sin(Math.PI / 4));
    ctx.lineTo(-this.atm / 3, 0);
    ctx.lineTo(-this.atm * Math.cos(Math.PI / 4), this.atm * Math.sin(Math.PI / 4));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(-disA, -disB, this.atm, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    if (this.bullet)
      this.bullet.render(ctx);
  }

  /** @function shoot
   *  Shoots this ships laser if it is ready.
   *  @param  {Number} cellSize   The size of the screen divisions for distance context.
   *  @param  {Number} spd        The multiple of the cell size to use for the speed.
   *  @return {Boolean}           Whether or not a new laser was shot.
   */
  shoot(cellSize, spd) {
    if (!this.bullet) {
      var vel = new Vector2D(spd, this.ori * Math.PI / 180, false);

      this.bullet = new Bullet(
        this.pos.add(vel.sca(1.5)),
        vel
      );
      return true;
    }
    return false;
  }

  /** @function update
   *  Updates this ship's location, orientation angle, and accessories.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   */
  update(width, height) {
    switch(this.ang) {
      case "cw":
        this.ori = (this.ori + this.trq) % 360;
        break;
      case "ccw":
        this.ori = (360 + this.ori - this.trq) % 360;
        break;
      default:
        break;
    }
    switch(this.lat) {
      case "acc":
        this.vel = this.vel.add(
          new Vector2D(this.spd, this.ori * Math.PI / 180, false)
        ).trm(this.maxSpd);
        break;
      default:
        this.vel = this.vel.sca(0.99);
        break;
    }

    this.pos = this.pos.add(this.vel).cmp(width, height);
    if (this.inv > 0)
      this.inv--;

    if (this.bullet && !this.bullet.update(width, height))
      this.bullet = null;
  }
}
