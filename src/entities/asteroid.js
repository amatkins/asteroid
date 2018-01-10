/* asteroid.js */
import * as Vector2D from "../vector2D.js";

/** @class Asteroid
 *  The destructable asteroid obstacles in the space of the game.
 *  @type {Asteroid}
 */
export default class Asteroid {
  /** @constructor
   *  Constructs a new asteroid.
   *  @param  {Obect}  pos      The position to spawn the asteroid.
   *  @param  {Number} lvl      The size class of this asteroid.
   *  @param  {Number} cellSize The size of the screen divisions.
   *  @param  {Number} vel      The velocity of the asteroid.
   *  @param  {Number} spn      The torque of the asteroid.
   */
  constructor(pos, lvl, cellSize, vel, spn) {
    this.pos = pos;
    this.ort = Math.random() * 360;
    this.vel = vel;
    this.spn = spn;
    this.lvl = lvl;
    this.sze = lvl / 5 * cellSize + cellSize / 5;
    this.sur = [];
    this.prz = lvl === 1 && Math.random() < 0.09;

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
        d1 = Vector2D.sub(this.pos, ast.pos),
        d2 = Vector2D.negate(d1);
    // Correct the velosity of this asteroid
    this.vel = Vector2D.sub(
      v1,
      Vector2D.scale(d1, 2 * ast.sze / (this.sze + ast.sze) * Vector2D.dot(Vector2D.sub(v1, v2), d1) / Vector2D.dot(d1, d1))
    );
    // Correct the velocity of the other asteroid
    ast.vel = Vector2D.sub(
      v2,
      Vector2D.scale(d2, 2 * this.sze / (this.sze + ast.sze) * Vector2D.dot(Vector2D.sub(v2, v1), d2) / Vector2D.dot(d2, d2))
    );
    // Correct the positions of both asteroids so they are no longer colliding
    this.pos = Vector2D.add(this.pos, Vector2D.scale(Vector2D.sub(Vector2D.scale(d1, (this.sze + ast.sze) / Vector2D.norm(d1)), d1), 0.5));
    ast.pos = Vector2D.add(ast.pos, Vector2D.scale(Vector2D.sub(Vector2D.scale(d2, (this.sze + ast.sze) / Vector2D.norm(d2)), d2), 0.5));
  }

  /** @function createSurface
   *  Creates the uneven surface of this asteroid.
   */
  createSurface() {
    var t = 0,
        r = (this.sze * 0.5) + Math.random() * (this.sze * 0.5),
        newR;
    // Going the circumference of the asteroid
    while (t < 360) {
      // find a new acceptable point
      do {
        newR = r;

        var probability = Math.random();
        // Determine of the next point will be lower of higher
        if (probability < 0.50)
          newR -= (this.sze * 0.05) + Math.random() * (this.sze * 0.1);
        else if (probability < 1.00)
          newR += (this.sze * 0.05) + Math.random() * (this.sze * 0.1);

      } while (this.sze < newR || newR < (this.sze * 0.5));
      // Update the current point
      r = newR;
      // Add to the list
      this.sur.push({ x: r * Math.cos(t * Math.PI / 180), y:  r * Math.sin(t * Math.PI / 180) });
      // Advance along the circumference
      t += Math.min(5 + Math.random() * 40, 360 - t);
    }
  }

  /** @function degrade
   *  Degrades this asteroid into smaller chuncks.
   *  @param  {Object} center     The location of the bullet to determine angle of collision.
   *  @param  {Number} cellSize   The size of the screen divisions.
   *  @return {Array}             The list of new asteroids created after degredation.
   */
  degrade(center, cellSize) {
    // Predetermine sizes of the subunits
    let subLevels = [],
        lvl = this.lvl,
        sLvl;
    // Determine what the new sizes will be
    while (lvl > 0) {
      sLvl = 1 + Math.round(Math.random() * (lvl - 1 - (subLevels.length === 0 ? 1 : 0)));
      subLevels.push(sLvl);
      lvl -= sLvl;
    }
    // Create an asteroid for each of the subunits
    let subUnits = [],
        angleBase = (Vector2D.angle(Vector2D.sub(this.pos, center)) * 180 / Math.PI + 90) % 360,
        angle, radius, offset;

    for (let i = 0; i < subLevels.length; i++) {
      sLvl = subLevels[i];
      angle = (angleBase + i / subLevels.length * 360) % 360;
      radius = cellSize / 2 + sLvl * cellSize / 10;
      offset = Vector2D.construct(radius, angle * Math.PI / 180, false);
      // Add the new asteroid to the list of asteroids
      subUnits.push(
        new Asteroid(
          Vector2D.add(this.pos, offset),
          sLvl,
          cellSize,
          Vector2D.add(Vector2D.scale(this.vel, 0.5 + 0.2 * (sLvl / 3)), Vector2D.scale(Vector2D.unit(offset), cellSize / 100 + Math.random() * cellSize / 60)),
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
    // Save the canvas context settings
    ctx.save();
    // Translate and rotate the origin to the center of this asteroid
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate((this.ort * Math.PI) / 180);
    // Draw background atmospheres
    ctx.strokeStyle = this.prz? 'rgba(0, 255, 255, 0.5)' : 'rgba(128, 0, 255, 0.5)';
    ctx.fillStyle = this.prz? 'rgba(0, 255, 255, 0.2)' : 'rgba(128, 0, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(disA, disB, this.sze, 0, 2* Math.PI, false);
    ctx.fill();
    ctx.stroke();
    // Draw the surface of the asteroid
    ctx.strokeStyle = this.prz? 'yellow' : 'white';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.sur[0].x, this.sur[0].y);
    for (let i = 1; i < this.sur.length; i++) {
      ctx.lineTo(this.sur[i].x, this.sur[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Draw the foreground atmospheres
    ctx.strokeStyle = this.prz? 'rgba(255, 0, 255, 0.5)' : 'rgba(0, 255, 0, 0.5)';
    ctx.fillStyle = this.prz? 'rgba(255, 0, 255, 0.15)' : 'rgba(0, 255, 0, 0.15)';
    ctx.beginPath();
    ctx.arc(-disA, -disB, this.sze, 0, 2* Math.PI, false);
    ctx.fill();
    ctx.stroke();
    // Restore the canvas context settings
    ctx.restore();
  }

  /** @function update
   *  Updates this asteroids position, orientation angle.
   *  @param  {Vector2D} width  The width extremas.
   *  @param  {Vector2D} height The height extremas.
   */
  update(width, height) {
    // Update the position of the asteroid
    this.pos = Vector2D.wrap(Vector2D.add(this.pos, this.vel), width, height);
    // Update the orientation of the asteroid
    this.ort = (this.ort + this.spn) % 360;
  }
}
