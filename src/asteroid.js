/* asteroid.js */

import Vector2D from './vector2D';

/** @class Asteroid
 *  The destructable asteroid obstacles in the space of the game.
 *  @type {Asteroid}
 */
export default class Asteroid {
  /** @constructor
   *  Constructs a new asteroid.
   *  @param  {Vector2D} pos    The position to spawn the asteroid.
   *  @param  {Number} lvl      The size class of this asteroid.
   *  @param  {Number} cellSize The size of the screen divisions.
   *  @param  {Number} vel      The velocity of the asteroid.
   *  @param  {Number} spn      The torque of the asteroid.
   */
  constructor(pos, lvl, cellSize, vel, spn) {
    this.pos = pos
    this.ort = Math.random() * 360;
    this.vel = vel;
    this.spn = spn;
    this.lvl = lvl;
    this.sze = lvl / 5 * cellSize + cellSize / 5;
    this.sur = [];

    this.createSurface();

    this.bounce = this.bounce.bind(this);
    this.createSurface = this.createSurface.bind(this);
    this.degrade = this.degrade.bind(this);
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function bounce
   *  Calculates the new traectory and postion of this and another asteroid after a collision.
   *  @param  {Asteroid} ast The other asteroid to bounce off of.
   */
  bounce(ast) {
    var v1 = this.vel,
        v2 = ast.vel,
        d1 = this.pos.sub(ast.pos),
        d2 = d1.neg();

    this.vel = v1.sub(
      d1.sca(2 * ast.sze / (this.sze + ast.sze) * v1.sub(v2).dot(d1) / d1.dot(d1))
    );

    ast.vel = v2.sub(
      d2.sca(2 * this.sze / (this.sze + ast.sze) * v2.sub(v1).dot(d2) / d2.dot(d2))
    );

    this.pos = this.pos.add(d1.sca((this.sze + ast.sze) / d1.nrm()).sub(d1).sca(0.5));
    ast.pos = ast.pos.add(d2.sca((this.sze + ast.sze) / d2.nrm()).sub(d2).sca(0.5));
  }

  /** @function createSurface
   *  Creates the uneven surface of this asteroid.
   */
  createSurface() {
    var t = 0,
        r = (this.sze * 0.5) + Math.random() * (this.sze * 0.5),
        newR;

    while (t < 360) {
      do {
        newR = r;

        var probability = Math.random();

        if (probability < 0.50)
          newR -= (this.sze * 0.05) + Math.random() * (this.sze * 0.1);
        else if (probability < 1.00)
          newR += (this.sze * 0.05) + Math.random() * (this.sze * 0.1);

      } while (this.sze < newR || newR < (this.sze * 0.5));

      r = newR;

      this.sur.push({ x: r * Math.cos(t * Math.PI / 180), y:  r * Math.sin(t * Math.PI / 180) });

      t += Math.min(5 + Math.random() * 40, 360 - t);
    }
  }

  /** @function degrade
   *  Degrades this asteroid into smaller chuncks.
   *  @param  {Vector2D} center   The location of the bullet to determine angle of collision.
   *  @param  {Number} cellSize   The size of the screen divisions.
   *  @return {Array}             The list of new asteroids created after degredation.
   */
  degrade(center, cellSize) {
    // Predetermine szes of the subunits
    var subLevels = [],
        lvl = this.lvl,
        sLvl;

    while (lvl > 0) {
      sLvl = 1 + Math.round(Math.random() * (lvl - 1 - (subLevels.length === 0 ? 1 : 0)));
      subLevels.push(sLvl);
      lvl -= sLvl;
    }

    // Create an asteroid for each of the subunits
    var subUnits = [],
        angleBase = (this.pos.sub(center).dir() * 180 / Math.PI + 90) % 360,
        angle, radius, offset;

    for (let i = 0; i < subLevels.length; i++) {
      sLvl = subLevels[i];
      angle = (angleBase + i / subLevels.length * 360) % 360;
      radius = cellSize / 2 + sLvl * cellSize / 10;
      offset = new Vector2D(radius, angle * Math.PI / 180);

      subUnits.push(
        new Asteroid(
          this.pos.add(offset),
          sLvl,
          cellSize,
          this.vel.sca(0.5 + 0.2 * (sLvl / 3)).add(offset.uni().sca(cellSize / 100 + Math.random() * cellSize / 60)),
          -10 + Math.random() * 20
        )
      );
    }

    return subUnits;
  }

  /** @function render
   *  Renders this asteroid onto the buffer.
   *  @param  {CanvasContext} ctx The buffer to render on.
   */
  render(ctx) {
    var disA = -3 + Math.round(Math.random() * 6);
    var disB = -3 + Math.round(Math.random() * 6);

    ctx.save();

    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate((this.ort * Math.PI) / 180);

    ctx.strokeStyle = 'rgba(128, 0, 255, 0.5)';
    ctx.fillStyle = 'rgba(128, 0, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(disA, disB, this.sze, 0, 2* Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.sur[0].x, this.sur[0].y);
    for (let i = 1; i < this.sur.length; i++) {
      ctx.lineTo(this.sur[i].x, this.sur[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
    ctx.beginPath();
    ctx.arc(-disA, -disB, this.sze, 0, 2* Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  /** @function update
   *  Updates this asteroids position, orientation angle.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   */
  update(width, height) {
    this.pos = this.pos.add(this.vel).cmp(width, height);

    this.ort = (this.ort + this.spn) % 360;
  }
}
