/* entController.js */
import Ship from "./ship.js";
import Asteroid from "./asteroid.js";
import Powerup from "./powerup.js";
import * as Vector2D from "../vector2D.js";

/** @class EntController
 *  The controller for entities of the game.
 *  @type {EntController}
 */
export default class EntController {
  /** @constructor
   *  Constructs a new entity controller.
   *  @param  {[Number]} width      The width of the visible screen.
   *  @param  {[Number]} height     The height of the visible screen.
   *  @param  {[Number]} cellSize   The size of the screen divisions.
   */
  constructor(width, height, cellSize) {
    this.ship = new Ship(width, height, cellSize, 3);
    this.bullets = [];
    this.asteroids = [];
    this.spawn = 1;
    this.aLimit = 10;
    this.powerups = [];

    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.wBounds = Vector2D.construct(-this.cellSize / 4, this.width + this.cellSize / 4);
    this.hBounds = Vector2D.construct(-this.cellSize / 4, this.height + this.cellSize / 4);
  }

  /** @function createAsteroid
   *  Creates a new asteroid at the edge of the screen.
   *  @return {Asteroid}  The asteroid created.
   */
  createAsteroid() {
    let pos, diff, lvl;

    // Place on the borders of the view
    switch (Math.round(Math.random() * 4)) {
      case 0:
        pos = Vector2D.construct(0, Math.random() * (this.hBounds.y - 2));
        break;
      case 1:
        pos = Vector2D.construct(this.width - 1, Math.random() * (this.hBounds.y - 2));
        break;
      case 2:
        pos = Vector2D.construct(Math.random() * (this.wBounds.y - 2), 0);
        break;
      case 3:
      default:
        pos = Vector2D.construct(Math.random() * (this.wBounds.y - 2), this.height - 1);
        break;
    }
    // Find the vector between the ship and the new asteroid
    diff = Vector2D.sub(
      Vector2D.construct(
        this.ship.pos.x - this.cellSize * 2 + Math.random() * this.cellSize * 4,
        this.ship.pos.y - this.cellSize * 2 + Math.random() * this.cellSize * 4
      ),
      pos
    );
    // Get a velocity in the general direction of the ship
    let vel = Vector2D.construct(
      this.cellSize / 100 + Math.random() * (this.cellSize / 50),
      Math.atan2(diff.y, diff.x),
      false
    );
    // Determine size class
    lvl = 1 + Math.round(Math.random() * 3);

    return new Asteroid(pos, lvl, this.cellSize, vel, -5 + Math.random() * 10);
  }

  /** @function breakAsteroid
   *  Breaks the asteroid into smaller parts or completely.
   *  @param  {Number} j  The index of the asteroid in the list.
   */
  breakAsteroid(j) {
    let upgrades = ["life", "invincible", "normal", "rapid", "spread"];
    let colors = ["green", "white", "black", "red", "blue"];
    let score = 0;
    let visual, sound, choice;

    // Place an explosion effect at the old asteroid
    visual = {type: "explosion", data: this.asteroids[j].pos};
    // If the asteroid is tier 2 or higher degrade it
    if (this.asteroids[j].lvl > 1) {
      this.asteroids[j].degrade(this.ship.pos, this.cellSize).forEach(subUnit => {
        this.asteroids.push(subUnit);
      });
      // Play a cracking sound
      sound = {channel: "asteroids", track: "crack"};
    }
    // Otherwise destroy the asteroid completely
    else {
      // If the asteroid contained a prize, place it on the playing area
      if (this.asteroids[j].prz) {
        choice = Math.floor(Math.random() * upgrades.length);
        this.powerups.push(new Powerup(this.asteroids[j].pos, this.cellSize / 4, upgrades[choice], colors[choice]));
      }
      // Play a breaking sound
      sound = {channel: "asteroids", track: "break"};
    }
    // Remove asteroid from array
    this.asteroids.splice(j, 1);
    // Increase score
    score++;

    return {score: score, visual: visual, channel: sound.channel, track: sound.track};
  }

  render(ctx) {
    this.powerups.forEach(powerup => {
      powerup.render(ctx);
    })

    this.ship.render(ctx);

    this.bullets.forEach(bullet => {
        bullet.render(ctx);
    });

    this.asteroids.forEach(asteroid => {
      asteroid.render(ctx);
    });
  }

  restart(level) {
    this.ship = new Ship(this.width, this.height, this.cellSize, level ? this.ship.lives : 3);
    this.bullets = [];
    this.asteroids = [];
    this.spawn = 1;
    this.aLimit = (10 + level * 5) % 50;
    this.powerups = [];
  }

  /** @function update
   *  Updates all the entities on the level.
   *  @return {Array}  The state of the game and all visual and sounds effects generated.
   */
  update(elapseCounter, score) {
    let state = "running";
    let sounds = [];
    let visuals = [];
    let effects;

    // Update ship
    this.ship.update(this.wBounds, this.hBounds);
    // Determing if moving
    let clouds = this.ship.propel();
    if (clouds.length > 0) {
      visuals.push({type: "clouds", data: clouds});
    }
    // Determine if shooting
    let bullets = this.ship.shoot(this.cellSize);
    if (bullets.length > 0) {
      this.bullets = this.bullets.concat(bullets);
      sounds["ship"] = "shoot";
    }

    // Update asteroid
    this.asteroids.forEach(asteroid => {
      asteroid.update(this.wBounds, this.hBounds);
    });
    // Check for and correct asteroid collisions
    for (let i = 0; i < this.asteroids.length; i++) {
      for (let j = i + 1; j < this.asteroids.length; j++) {
        if (Vector2D.norm(Vector2D.sub(this.asteroids[i].pos, this.asteroids[j].pos)) < (this.asteroids[i].sze + this.asteroids[j].sze)) {
          this.asteroids[i].bounce(this.asteroids[j]);
          sounds["asteroids"] = "bounce";
        }
      }
    }

    // Update powerups
    for (let pu = 0; pu < this.powerups.length;) {
      switch(this.powerups[pu].update(this.ship.pos, this.ship.atm)) {
        case "life":
          this.ship.lives++;
          this.powerups.splice(pu, 1);
          sounds["ui"] = "powerup";
          break;
        case "invincible":
          this.ship.inv = 300;
          score++;
          this.powerups.splice(pu, 1);
          sounds["ui"] = "powerup";
          break;
        case "normal":
          if (this.ship.fire !== "normal")
            this.ship.fire = "normal";
          score++;
          this.powerups.splice(pu, 1);
          sounds["ui"] = "powerup";
          break;
        case "rapid":
          if (this.ship.fire !== "rapid")
            this.ship.fire = "rapid";
          score++;
          this.powerups.splice(pu, 1);
          sounds["ui"] = "powerup";
          break;
        case "spread":
          if (this.ship.fire !== "spread")
            this.ship.fire = "spread";
          score++;
          this.powerups.splice(pu, 1);
          sounds["ui"] = "powerup";
          break;
        default:
          pu++;
          break;
      }
    }

    // Update bullets
    for (let b = 0; b < this.bullets.length; b++) {
      // If bullet runs off screen, then dispose
      if (this.bullets[b] && !this.bullets[b].update(this.wBounds, this.hBounds))
        this.bullets[b] = null;

      if (this.bullets[b]) {
        // Check if the bullet hit an asteroid
        let a = this.asteroids.findIndex(entity => {
          return Vector2D.norm(Vector2D.sub(entity.pos, this.bullets[b].pos)) < entity.sze;
        });
        // If an asteroid was hit, then break it
        if (a > -1) {
          effects = this.breakAsteroid(a);
          visuals.push(effects.visual);
          sounds[effects.channel] = effects.track;
          score = score + effects.score;
          this.bullets[b] = null;
        }
        // Otherwise check if the bullet hit the ship
        else {
          if (!this.ship.inv) {
            if (Vector2D.norm(Vector2D.sub(this.ship.pos, this.bullets[b].pos)) < this.ship.atm) {
              // If the ship has more live, continue
              if (this.ship.lives > 1) {
                this.ship = new Ship(this.width, this.height, this.cellSize, this.ship.lives - 1);
              }
              // Otherwise, game over
              else {
                state= "over"
              }
              sounds["ship"] = "death";
              this.bullets[b] = null;
            }
          }
        }
      }
    }
    // Remove bullets that were nullified
    this.bullets = this.bullets.filter(bullet => bullet);


    // Check collisions between asteroids and the ship
    if (!this.ship.inv) {
      for (let i = 0; i < this.asteroids.length; i++) {
        if (Vector2D.norm(Vector2D.sub(this.asteroids[i].pos, this.ship.pos)) < (this.asteroids[i].sze + this.ship.atm)) {
          // If the ship has more lives, continue
          if (this.ship.lives > 1) {
            this.ship = new Ship(this.width, this.height, this.cellSize, this.ship.lives - 1);
          }
          // Otherwise, game over
          else {
            state = "over";
          }
          sounds["ship"] = "death";
        }
      }
    }

    if (
      elapseCounter &&
      !(elapseCounter % 1000) &&
      this.aLimit < 100
    )
    this.aLimit++;

    if (this.spawn < this.aLimit) {
      if (elapseCounter % 50 === 0 || this.asteroids.length === 0) {
        this.asteroids.push(this.createAsteroid());
        this.spawn++;
      }
    }

    if (this.asteroids.length === 0)
      state = "complete";

    return {state: state, score: score, visuals: visuals, sounds: sounds};
  }
}
