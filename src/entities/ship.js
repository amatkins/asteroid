/* ship.js */

import Bullet from "./bullet.js";
import * as Vector2D from "../vector2D.js";

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
    this.pos = Vector2D.construct(width / 2, height / 2);
    this.ori = 270;
    this.atm = cellSize * (2 / 5);
    this.vel = Vector2D.construct(0, 0);
    this.lat = "na";
    this.spd = 0;
    this.maxSpd = cellSize * 0.1;
    this.ang = "na";
    this.trq = 0;
    this.sht = "na";
    this.str = 0;
    this.cld = 0;
    this.fire = "normal";
    this.upgCld = 0;
    this.maxCld = 30;
    this.lives = lives;
    this.inv = 100;

    this.shoot = this.shoot.bind(this);
    this.propel = this.propel.bind(this);
    this.pullInput = this.pullInput.bind(this);
    this.stopInput = this.stopInput.bind(this);
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  shoot(cellSize) {
    let bullets = [];
    let vel;

    switch(this.sht) {
      case "sht":
        if (!this.cld) {
          switch (this.fire) {
            case "rapid":
              vel = Vector2D.construct(this.str * cellSize, this.ori * Math.PI / 180, false);
              bullets.push(new Bullet(Vector2D.add(this.pos, Vector2D.scale(vel, 1.5)), vel, "red"));
              this.cld = Math.floor(this.maxCld * 0.75);
              break;
            case "spread":
              for (let s = -1; s < 2; s++) {
                vel = Vector2D.construct(this.str * cellSize, (this.ori + s * 15) * Math.PI / 180, false);
                bullets.push(new Bullet(Vector2D.add(this.pos, Vector2D.scale(vel, 1.5)), vel, "blue"));
              }
              this.cld = Math.floor(this.maxCld * 1.25);
              break;
            default:
              vel = Vector2D.construct(this.str * cellSize, this.ori * Math.PI / 180, false);
              bullets.push(new Bullet(Vector2D.add(this.pos, Vector2D.scale(vel, 1.5)), vel, "grey"));
              this.cld = this.maxCld;
              break;
          }
        }
        else
          this.cld--;
        break;
      default:
        if (this.cld)
          this.cld--;
        break;
    }
    return bullets;
  }

  propel() {
    let clouds = [];
    let pos;

    switch(this.ang) {
      case "cw":
        pos = Vector2D.construct(this.atm, (this.ori - 45) * Math.PI / 180, false);
        clouds.push({pos: Vector2D.add(this.pos, pos), rad: this.atm * 0.7, life: 10, dens: 10, colors: ["white"]});
        break;
      case "ccw":
        pos = Vector2D.construct(this.atm, (this.ori + 45) * Math.PI / 180, false);
        clouds.push({pos: Vector2D.add(this.pos, pos), rad: this.atm * 0.7, life: 10, dens: 10, colors: ["white"]});
        break;
      default:
        break;
    }
    switch(this.lat) {
      case "acc":
        pos = Vector2D.construct(this.atm + 5, (this.ori + (this.spd > 0 ? 180 : 0)) * Math.PI / 180, false);
        clouds.push({pos: Vector2D.add(this.pos, pos), rad: this.atm * 0.7, life: 40, dens: 10, colors: ["white"]});
        break;
      default:
        break;
    }
    return clouds;
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
      case "sht":
        this.sht = inp.sig;
        this.str = inp.str;
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
    } else if (inp === this.sht) {
      this.sht = "na";
      this.str = 0;
    }
  }

  /** @function render
   *  Renders this ship on the screen.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    var disA = -1 + Math.round(Math.random() * 2);
    var disB = -1 + Math.round(Math.random() * 2);
    // Save the canvas context settings
    ctx.save();
    // Translate the origin to the center of the ship
    ctx.translate(this.pos.x, this.pos.y);
    // Draw the cooldown bar
    ctx.fillStyle = "red";
    ctx.fillRect(-this.atm, -this.atm * (3 / 2), (this.atm * 2) * (this.cld / this.maxCld), 2);
    // Rotate the origin to orient the ship "up"
    ctx.rotate(this.ori * Math.PI / 180);
    // Draw background atmosphere
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(disA, disB, this.atm, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    // Draw the ship itself
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
    // Draw foreground atmosphere
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(-disA, -disB, this.atm, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    // Restore the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Updates this ship's location, orientation angle, and accessories.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   */
  update(width, height) {
    let bullets = [];
    // Update the spin
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
    // Update the velocity
    switch(this.lat) {
      case "acc":
        this.vel = Vector2D.trunc(
          Vector2D.add(
            this.vel,
            Vector2D.construct(this.spd, this.ori * Math.PI / 180, false)
          ),
          this.maxSpd
        );
        break;
      default:
        this.vel = Vector2D.scale(this.vel, 0.99);
        break;
    }
    // Update the gun cool down
    if (this.cld)
      this.cld--;
    // Update the upgrade cool down
    if (this.upgCld > 0)
      this.upgCld--;
    else if (!this.upgCld) {
      this.fire = "normal";
      this.upgCld = -1;
    }
    // Update the position
    this.pos = Vector2D.wrap(Vector2D.add(this.pos, this.vel), width, height);
    // Update the invincibity count down
    if (this.inv)
      this.inv--;

    return bullets;
  }
}
