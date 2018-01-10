/* vfxController.js */

import Twinkle from "./twinkle.js";
import Explosion from "./explosion.js";
import Cloud from "./cloud.js";
import * as Vector2D from "../vector2D.js";

/** @class VFXController
 *  The controller for visual effects of the game.
 *  @type {VFXController}
 */
export default class VFXController {
  /** @constructor
   *  Constructs a new effects controller.
   *  @param  {Number} width      The width of the visible screen.
   *  @param  {Number} height     The height of the visible screen.
   *  @param  {Number} cellSize   The size of the screen divisions.
   */
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.explosions = [];
    this.clouds = [];
    this.twinkles = [];
    // Generate the sky
    for (let i = 0; i < 10; i++) {
      this.twinkles.push(
        new Twinkle(
          Vector2D.construct(Math.random() * width, Math.random() * height),
          (1 + Math.random() * 1) * cellSize / 10,
          40 + Math.round(Math.random() * 20)
        )
      );
    }
    // Bind this to the methods
    this.cloud = this.cloud.bind(this);
    this.explosion = this.explosion.bind(this);
    this.render = this.render.bind(this);
    this.restart = this.restart.bind(this);
    this.update = this.update.bind(this);
  }

  /** @function cloud
   *  Spawns a new cloud effect.
   *  @param  {Object} data Data about position, radius, duration, density, and colors of the cloud.
   */
  cloud(data) {
    this.clouds.push(new Cloud(data.pos, data.rad, data.life, data.dens, data.colors));
  }

  /** @function explosion
   *  Creates an explosion effect.
   *  @param  {Object} pos The position of the explosion.
   */
  explosion(pos) {
    this.explosions.push(new Explosion(pos, Math.random() * 2 * Math.PI, 10));
    this.clouds.push(new Cloud(pos, this.cellSize, 40, 20, ["white", "purple", "green"]));
  }

  /** @function render
   *  Renders all visual effects on the buffer.
   *  @param  {CanvasContext} ctx The canvas back buffer.
   */
  render(ctx) {
    // Render twinkles
    this.twinkles.forEach((twinkle) => {
      twinkle.render(ctx);
    });
    // Render explosions
    this.explosions.forEach(explosion => {
      explosion.render(ctx);
    });
    // Render clouds
    this.clouds.forEach(cloud => {
      cloud.render(ctx);
    });
  }

  /** @function restart
   *  Clears all the visual effects.
   */
  restart() {
    this.explosions = [];
    this.clouds = [];
    this.twinkles = [];
    this.trails = [];
    // Generate the sky
    for (let i = 0; i < 10; i++) {
      this.twinkles.push(
        new Twinkle(
          Vector2D.construct(Math.random() * this.width, Math.random() * this.height),
          (1 + Math.random() * 1) * this.cellSize / 10,
          40 + Math.round(Math.random() * 20)
        )
      );
    }
  }

  /** @function update
   *  Updates all the visual effects.
   */
  update() {
    // Update twinkles
    for (let i = 0; i < this.twinkles.length; i++) {
      if (!this.twinkles[i].update()) {
        this.twinkles[i] = new Twinkle(Vector2D.construct(Math.random() * this.width, Math.random() * this.height), (1 + Math.random() * 1) * this.cellSize / 10, 40 + Math.round(Math.random() * 20));
      }
    }
    // Update explosions
    for (let i = 0; i < this.explosions.length; i++) {
      if (!this.explosions[i].update()) {
        this.explosions.splice(i, 1);
        i--;
      }
    }
    // Update clouds
    for (let i = 0; i < this.clouds.length; i++) {
      if (!this.clouds[i].update()) {
        this.clouds.splice(i, 1);
        i--;
      }
    }
  }
}
