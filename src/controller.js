/* controller.js */

import Asteroid from './asteroid';
import Ship from './ship';
import Twinkle from './twinkle';
import Explosion from './explosion';
import MediaController from './media/mediaController';
import Vector2D from './vector2D';

/** @class Controller
 *  The controller for the entire game.
 *  @type {Controller}
 */
export default class Controller {
  /** @constructor
   *  Constructs a new universal game controller.
   *  @param  {[type]} width      The width of the visible screen.
   *  @param  {[type]} height     The height of the visible screen.
   *  @param  {[type]} cellSize   The size of the screen divisions.
   */
  constructor(width, height, cellSize) {
    this.level = 0;
    this.asteroids = [];
    this.spawn = 1;
    this.aLimit = 10;
    this.explosions = [];
    this.aDestroyed = 0;
    this.highScore = 0;
    this.ship = new Ship(width, height, cellSize, 3);
    this.twinkles = [];
    this.cellSize = cellSize;
    this.height = height;
    this.width = width;
    this.wBounds = new Vector2D(-this.cellSize / 4, this.width + this.cellSize / 4);
    this.hBounds = new Vector2D(-this.cellSize / 4, this.height + this.cellSize / 4);

    this.ast_sfx = new MediaController();
    this.shp_sfx = new MediaController();

    this.frontScreen = document.createElement('canvas');
    this.frontScreen.width = width * 2.45;
    this.frontScreen.height = height * 2.45;
    this.frontScreen.border = 'solid';
    this.frontBuff = this.frontScreen.getContext('2d');
    document.body.appendChild(this.frontScreen);

    this.backScreen = document.createElement('canvas');
    this.backScreen.width = width;
    this.backScreen.height = height;
    this.backScreen.border = 'solid';
    this.backBuff = this.backScreen.getContext('2d');

    this.elapseCounter = 0;
    this.lowestTime = 0;
    this.speed = 20;
    this.state = "paused";

    for (let i = 0; i < 10; i++) {
      this.twinkles.push(
        new Twinkle(
          Math.random() * this.width,
          Math.random() * this.height,
          (1 + Math.random() * 1) * this.cellSize / 10,
          40 + Math.round(Math.random() * 20)
        )
      );
    }

    this.breakAsteroid = this.breakAsteroid.bind(this);
    this.createAsteroid = this.createAsteroid.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.loop = this.loop.bind(this);
    this.pause = this.pause.bind(this);
    this.render = this.render.bind(this);
    this.restart = this.restart.bind(this);
    this.unpause = this.unpause.bind(this);
    this.update = this.update.bind(this);

    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

    this.render('P/Pause: Play/Pause, WASD: Move, Space: Shoot');
  }

  /** @function breakAsteroid
   *  Breaks the asteroid into smaller parts or completely.
   *  @param  {Number} j  The index of the asteroid in the list.
   */
  breakAsteroid(j) {
    this.explosions.push(new Explosion(this.asteroids[j].pos, Math.random() * 2 * Math.PI, 10));

    if (this.asteroids[j].lvl > 1) {
      this.asteroids[j].degrade(this.ship.pos, this.cellSize).forEach((subUnit) => {
        this.asteroids.push(subUnit);
      });

      this.ast_sfx.play("crack");
    } else {
      this.ast_sfx.play("break");
    }

    this.asteroids.splice(j, 1);
    this.aDestroyed++;
  }

  /** @function createAsteroid
   *  Creates a new asteroid at the edge of the screen.
   *  @return {Asteroid}  The asteroid created.
   */
  createAsteroid() {
    var pos;

    switch (Math.round(Math.random() * 4)) {
      case 0:
        pos = new Vector2D(0, Math.random() * (this.hBounds.y - 2));
        break;
      case 1:
        pos = new Vector2D(this.width - 1, Math.random() * (this.hBounds.y - 2));
        break;
      case 2:
        pos = new Vector2D(Math.random() * (this.wBounds.y - 2), 0);
        break;
      case 3:
      default:
        pos = new Vector2D(Math.random() * (this.wBounds.y - 2), this.height - 1);
        break;
    }

    var vel = new Vector2D(
      this.ship.pos.x - this.cellSize * 2 + Math.random() * this.cellSize * 4,
      this.ship.pos.y - this.cellSize * 2 + Math.random() * this.cellSize * 4
    ).sub(pos).uni().sca(this.cellSize / 100 + Math.random() * this.cellSize / 50);

    var lvl = 1 + Math.round(Math.random() * 3);

    return new Asteroid(pos, lvl, this.cellSize, vel, -5 + Math.random() * 10)
  }

  /** @function handleKeyDown
   *  The beginning of a key press event.
   *  @param  {Object} event The key down event that was triggered.
   */
  handleKeyDown(event) {
    event.preventDefault();

    switch (event.key) {
      case 'w':
        if (!event.repeat)
          this.ship.pullInput({ sig: "acc", str: 0.08 });
        break;
      case 'a':
        if (!event.repeat)
          this.ship.pullInput({ sig: "ccw", str: 2 });
        else
          this.ship.pullInput({ sig: "ccw", str: 6 });
        break;
      case 's':
        if (!event.repeat)
          this.ship.pullInput({ sig: "acc", str: -0.08 });
        break;
      case 'd':
        if (!event.repeat)
          this.ship.pullInput({ sig: "cw", str: 2 });
        else
          this.ship.pullInput({ sig: "cw", str: 6 });
        break;
      case ' ':
      case 'ArrowUp':
        if (this.state === "running")
          if (this.ship.shoot(this.cellSize, 0.4))
            this.shp_sfx.play("shoot");
        break;
      case 'p':
      case 'Pause':
        if (!event.repeat) {
          switch (this.state) {
            case "running":
              this.pause();
              break;
            case "paused":
              this.unpause();
              break;
            case "complete":
              this.restart(this.level + 1);
              break;
            case "over":
              this.restart();
              break;
            default:
              break;
          }
        }
        break;
      default:
        break;
    }
  }

  /** @function handleKeyUp
   *  The end of a key press event.
   *  @param  {Object} event The key up event that was triggered.
   */
  handleKeyUp(event) {
    event.preventDefault();

    switch (event.key) {
      case 'w':
        this.ship.stopInput('acc');
        break;
      case 'a':
        this.ship.stopInput("ccw");
        break;
      case 's':
        this.ship.stopInput('acc');
        break;
      case 'd':
        this.ship.stopInput("cw");
        break;
      default:
        break;
    }
  }

  /** @function loop
   *  Updates the entities and renders them each loop iteration.
   */
  loop() {
    this.update();
    switch (this.state) {
      case 'running':
        this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`);
        break;
      case 'complete':
        this.render(`Level Complete!`);
        clearInterval(this.loopID);
        break;
      case 'over':
        this.render(`Game Over!`);
        clearInterval(this.loopID);
        break;
      case 'paused':
      default:
        break;
    }
    this.elapseCounter++;
  }

  /** @function pause
   *  Pauses the game.
   */
  pause() {
    this.state = "paused";
    clearInterval(this.loopID);
    this.render('P/Pause: Play/Pause, WASD: Move, Space: Shoot');
  }

  /** @function render
   *  Renders all the entities on the screen.
   *  @param  {String} mssgText The state specific text to display.
   */
  render(mssgText = '') {
    var livesText, livesTextDim, scoreText, scoreTextDim, mssgTextDim;

    this.backBuff.clearRect(0, 0, this.width, this.height);

    this.twinkles.forEach((twinkle) => {
      twinkle.render(this.backBuff);
    });

    this.ship.render(this.backBuff);

    this.asteroids.forEach((asteroid) => {
      asteroid.render(this.backBuff);
    });

    this.explosions.forEach((explosion) => {
      explosion.render(this.backBuff);
    });

    this.backBuff.save();

    this.backBuff.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.backBuff.font = `${this.cellSize - this.cellSize * 0.5 * (this.elapseCounter % 100) / 100}px Arial`;
    scoreText = `Score: ${this.aDestroyed} Time: ${Math.floor(this.elapseCounter / 100)}`;
    scoreTextDim = this.backBuff.measureText(scoreText);
    this.backBuff.fillText(scoreText, (this.width / 2) - scoreTextDim.width / 2, this.cellSize);

    this.backBuff.font = `${this.cellSize * 0.6}px Arial`;
    livesText = `Lives: ${this.ship.lives}`;
    livesTextDim = this.backBuff.measureText(livesText);
    this.backBuff.fillText(livesText, this.width - livesTextDim.width - 5, this.cellSize * 0.6);

    this.backBuff.fillText(`Level: ${this.level + 1}`, 5, this.cellSize * 0.6);

    var dynamic = 1;
    do {
      this.backBuff.font = `${this.cellSize * dynamic}px Arial`;
      mssgTextDim = this.backBuff.measureText(mssgText);
      dynamic = dynamic * 0.95;
    } while (mssgTextDim.width > this.width - 10);
    this.backBuff.fillText(mssgText, (this.width / 2) - mssgTextDim.width / 2, this.height - 10);

    this.backBuff.restore();

    this.frontBuff.save();
    this.frontBuff.scale(2.45, 2.45);
    this.frontBuff.clearRect(0, 0, this.width, this.height);
    this.frontBuff.drawImage(this.backScreen, 0, 0);
    this.frontBuff.restore();
  }

  /** @function restart
   *  Starts/Restarts a level of the game.
   *  @param  {Number} level The level to setup.
   */
  restart(level = 0) {
    this.level = level;
    if (this.aDestroyed > this.highScore) {
      this.highScore = this.aDestroyed;
      this.lowestTime = Math.floor(this.elapseCounter / 100);
    } else if (this.aDestroyed === this.highScore && Math.floor(this.elapseCounter / 100) < this.lowestTime)
      this.lowestTime = Math.floor(this.elapseCounter / 100);
    this.asteroids = [];
    this.spawn = 1;
    this.aLimit = (10 + level * 5) % 50;
    this.explosions = [];
    this.aDestroyed = this.level > 0 ? this.aDestroyed : 0;
    this.ship = new Ship(this.width, this.height, this.cellSize, this.level > 0 ? this.ship.lives : 3);
    this.twinkles = [];
    this.elapseCounter = this.level > 0 ? this.elapseCounter : 0;
    this.speed = 20;
    this.state = "paused";

    for (let i = 0; i < 10; i++) {
      this.twinkles.push(
        new Twinkle(
          Math.random() * this.width,
          Math.random() * this.height,
          (1 + Math.random() * 1) * this.cellSize / 10,
          40 + Math.round(Math.random() * 20)
        )
      );
    }

    this.render('P/Pause: Play/Pause, WASD: Move, Space: Shoot');
  }

  /** @function unpause
   *  Unpauses the game.
   */
  unpause() {
    this.state = "running";
    this.loopID = setInterval(() => this.loop(), this.speed);
    this.render();
  }

  /** @function update
   *  Updates all the entities in the game.
   */
  update() {
    this.ship.update(this.wBounds, this.hBounds);

    this.asteroids.forEach((asteroid) => {
      asteroid.update(this.wBounds, this.hBounds);
    });

    for (let i = 0; i < this.asteroids.length; i++) {
      for (let j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].pos.sub(this.asteroids[j].pos).nrm() < (this.asteroids[i].sze + this.asteroids[j].sze)) {
          this.asteroids[i].bounce(this.asteroids[j]);
          this.ast_sfx.play('bounce');
        }
      }
    }

    if (this.ship.bullet) {
      let b = this.asteroids.findIndex((entity) => {
        return entity.pos.sub(this.ship.bullet.pos).nrm() < entity.sze;
      });

      if (b > -1) {
        this.breakAsteroid(b);
        this.ship.bullet = null;
      }
    }

    if (this.ship.inv === 0) {
      for (let i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i].pos.sub(this.ship.pos).nrm() < (this.asteroids[i].sze + this.ship.atm)) {
          if (this.ship.lives > 1) {
            this.ship = new Ship(this.width, this.height, this.cellSize, this.ship.lives - 1);
          } else {
            this.state = 'over';
          }
          this.shp_sfx.play("death");
        }
      }
    }

    if (
      this.elapseCounter !== 0 &&
      this.elapseCounter % 1000 === 0 &&
      this.aLimit < 100
    )
      this.aLimit++;

    for (let i = 0; i < this.twinkles.length; i++) {
      if (!this.twinkles[i].update()) {
        this.twinkles[i] = new Twinkle(Math.random() * this.width, Math.random() * this.height, (1 + Math.random() * 1) * this.cellSize / 10, 40 + Math.round(Math.random() * 20));
      }
    }

    for (let i = 0; i < this.explosions.length; i++) {
      if (!this.explosions[i].update()) {
        this.explosions.splice(i, 1);
        i--;
      }
    }

    if (this.spawn < this.aLimit) {
      if (this.elapseCounter % 50 === 0 || this.asteroids.length === 0) {
        this.asteroids.push(this.createAsteroid());
        this.spawn++;
      }
    }

    if (this.asteroids.length === 0)
      this.state = "complete";
  }
}
