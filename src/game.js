/* game.js */
import EntController from "./entities/entController.js";
import VFXController from "./visuals/vfxController.js";
import SFXController from "./sounds/sfxController.js";
import * as Vector2D from "./vector2D.js";

/** @class Game
 *  The controller for the game itself.
 *  @type {Game}
 */
export default class Game {
  /** @constructor
   *  Constructs a new game controller.
   *  @param  {[Number]} width      The width of the visible screen.
   *  @param  {[Number]} height     The height of the visible screen.
   *  @param  {[Number]} cellSize   The size of the screen divisions.
   */
  constructor(width, height, cellSize) {
    this.level = 0;
    this.score = 0;
    this.highScore = 0;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.wBounds = Vector2D.construct(-this.cellSize / 4, this.width + this.cellSize / 4);
    this.hBounds = Vector2D.construct(-this.cellSize / 4, this.height + this.cellSize / 4);
    // Create controllers for the various assets
    this.ent = new EntController(width, height, cellSize);
    this.vfx = new VFXController(width, height, cellSize);
    this.sfx = new SFXController();
    // Create front buffer
    this.frontScreen = document.createElement('canvas');
    this.frontScreen.width = width * 2.45;
    this.frontScreen.height = height * 2.45;
    this.frontScreen.border = 'solid';
    this.frontBuff = this.frontScreen.getContext('2d');
    document.body.appendChild(this.frontScreen);
    // Create back buffer
    this.backScreen = document.createElement('canvas');
    this.backScreen.width = width;
    this.backScreen.height = height;
    this.backScreen.border = 'solid';
    this.backBuff = this.backScreen.getContext('2d');
    // Create flow control variables
    this.elapseCounter = 0;
    this.lowestTime = 0;
    this.speed = 20;
    this.state = "paused";
    // Bind functions to context
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.loop = this.loop.bind(this);
    this.pause = this.pause.bind(this);
    this.render = this.render.bind(this);
    this.restart = this.restart.bind(this);
    this.unpause = this.unpause.bind(this);
    this.update = this.update.bind(this);
    // Bind event handlers
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

    this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`, ["WASD to move", "UpArrow/Space to shoot forward", "DownArrow to shoot backward", "P/Pause to pause/unpause", "Shift + R to restart"]);
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
          this.ent.ship.pullInput({ sig: "acc", str: 0.08 });
        break;
      case 'a':
        if (!event.repeat)
          this.ent.ship.pullInput({ sig: "ccw", str: 2 });
        else
          this.ent.ship.pullInput({ sig: "ccw", str: 6 });
        break;
      case 's':
        if (!event.repeat)
          this.ent.ship.pullInput({ sig: "acc", str: -0.08 });
        break;
      case 'd':
        if (!event.repeat)
          this.ent.ship.pullInput({ sig: "cw", str: 2 });
        else
          this.ent.ship.pullInput({ sig: "cw", str: 6 });
        break;
      case ' ':
      case 'ArrowUp':
        if (this.state === "running")
          if (!event.repeat)
            this.ent.ship.pullInput({ sig: "sht", str: 0.5 });
          else
            this.ent.ship.pullInput({ sig: "sht", str: 0.6 });
        break;
      case 'ArrowDown':
        if (this.state === "running")
          if (!event.repeat)
            this.ent.ship.pullInput({ sig: "sht", str: -0.5 });
          else
            this.ent.ship.pullInput({ sig: "sht", str: -0.6 });
        break;
      case 'R':
        clearInterval(this.loopID);
        this.restart();
        break;
      case 'p':
      case 'Pause':
        if (!event.repeat) {
          switch (this.state) {
            case "running":
              this.sfx.play("ui", "beep");
              this.pause();
              break;
            case "paused":
              this.sfx.play("ui", "beep");
              this.unpause();
              break;
            case "complete":
              this.sfx.play("ui", "beep");
              clearTimeout(this.loopID);
              this.restart(this.level + 1);
              break;
            case "over":
              this.sfx.play("ui", "beep");
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
        this.ent.ship.stopInput('acc');
        break;
      case 'a':
        this.ent.ship.stopInput("ccw");
        break;
      case 's':
        this.ent.ship.stopInput('acc');
        break;
      case 'd':
        this.ent.ship.stopInput("cw");
        break;
      case ' ':
      case 'ArrowUp':
        this.ent.ship.stopInput("sht");
        break;
      case 'ArrowDown':
        this.ent.ship.stopInput("sht");
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
        this.render("", ["Level Complete!"]);
        clearInterval(this.loopID);
        this.loopID = setTimeout(() => this.restart(this.level + 1), 2000);
        break;
      case 'over':
        this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`, ["Game Over!","","Press P/Pause to restart"]);
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
    this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`, ["Game is paused"]);
  }

  resizeText(text, width = this.cellSize, height = this.cellSize) {
    let textFont = this.cellSize, textWidth, textHeight, lastAction = "none";

    for (let t = 0; t < 100; t++) {
      // Set font
      this.backBuff.font = `${textFont}pt Arial`;
      // Measure text
      textWidth = this.backBuff.measureText(text).width;
      textHeight = this.backBuff.measureText("M").width;
      // Grow if font is too small
      if (textWidth < width && textHeight < height && lastAction !== "shrink") {
        textFont++;
        lastAction = "grow";
      }
      // Shrink if font is too big
      else if (textWidth > width || textHeight > height) {
        textFont--;
        // If that last change made it too big, shrink and return
        if (lastAction === "grow")
          return textFont;
        // Otherwise shrink and continue
        else
          lastAction = "shrink";
      }
      // Otherwise return
      else
        return textFont;
    }
    return textFont;
  }

  /** @function render
   *  Renders all the entities on the screen.
   *  @param  {String} mssgText The state specific text to display.
   */
  render(subText = '', mssgText = []) {
    let levelText, scoreText, livesText, fontSize, minSize, textWidth, mssgTop;
    // Clear view
    this.backBuff.clearRect(0, 0, this.width, this.height);
    // Render visual effects
    this.vfx.render(this.backBuff);
    // Render entities
    this.ent.render(this.backBuff);
    // Save canvas context settings
    this.backBuff.save();
    // Set the fill color to a transparent white
    this.backBuff.fillStyle = 'rgba(255, 127, 0, 0.6)';
    // Setup text for the level
    levelText = `Level: ${this.level + 1}`;
    this.resizeText(levelText, this.cellSize * 3);
    // Print level text
    this.backBuff.fillText(levelText, 5, this.cellSize + 5);
    // Setup text for the score and time
    scoreText = `Score: ${this.score} Time: ${Math.floor(this.elapseCounter / 100)}`;
    fontSize = this.resizeText(scoreText, this.cellSize * 7);
    this.backBuff.font = `${fontSize - fontSize / 2 * (this.elapseCounter % 100) / 100}pt Arial`;
    textWidth = this.backBuff.measureText(scoreText).width;
    // Print score and time text
    this.backBuff.fillText(scoreText, (this.width - textWidth) / 2, this.cellSize - this.cellSize / 2 * (this.elapseCounter % 100) / 100 + 5);
    // Setup text for the lives
    livesText = `Lives: ${this.ent.ship.lives}`;
    this.resizeText(livesText, this.cellSize * 3);
    textWidth = this.backBuff.measureText(livesText).width;
    // Print lives text
    this.backBuff.fillText(livesText, this.width - textWidth - 5, this.cellSize + 5);
      if (mssgText.length > 0) {
      // Get the font size for the message text
      minSize = this.width;
      for (let mssg of mssgText) {
        fontSize = this.resizeText(mssg, this.width - 10, this.cellSize * 0.75);
        if (fontSize < minSize)
          minSize = fontSize;
      }
      // Set to minimum size so size is consistant
      this.backBuff.font = `${minSize}pt Arial`;
      // Setup the layout variables for the message
      mssgTop = (this.height - this.cellSize * 0.75 * mssgText.length) / 2
      // Create a neutral background
      this.backBuff.fillStyle = "black";
      this.backBuff.fillRect(5, mssgTop, this.width - 10, this.cellSize * 0.75 * mssgText.length + 5);
      this.backBuff.fillStyle = 'rgba(255, 127, 0, 0.6)';
      // Print the message text centered on the view
      for (let mssg= 0; mssg < mssgText.length; mssg++) {
        // Measure this line of text
        textWidth = this.backBuff.measureText(mssgText[mssg]).width;
        // Print as appropriately centered
        this.backBuff.fillText(mssgText[mssg], (this.width - textWidth) / 2, mssgTop + this.cellSize * 0.75 * (mssg + 1));
      }
    }
    if (subText) {
      // Setup text for the sub text
      this.resizeText(subText, this.width - 10, this.cellSize * 0.75);
      textWidth = this.backBuff.measureText(subText).width;
      // Print sub text
      this.backBuff.fillText(subText, (this.width - textWidth) / 2, this.height - 5);
    }
    // Restore canvas context settings
    this.backBuff.restore();
    // Print back buffer onto front buffer
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
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.lowestTime = Math.floor(this.elapseCounter / 100);
    } else if (this.score === this.highScore && Math.floor(this.elapseCounter / 100) < this.lowestTime)
      this.lowestTime = Math.floor(this.elapseCounter / 100);
    this.score = this.level > 0 ? this.score : 0;
    this.elapseCounter = this.level > 0 ? this.elapseCounter : 0;
    this.speed = 20;
    this.state = "paused";

    this.ent.restart(level);
    this.vfx.restart();

    this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`, ["Game is paused","","WASD to move", "UpArrow/Space to shoot forward", "DownArrow to shoot backward", "P/Pause to pause/unpause", "Shift + R to restart"]);
  }

  /** @function unpause
   *  Unpauses the game.
   */
  unpause() {
    this.state = "running";
    this.loopID = setInterval(() => this.loop(), this.speed);
    this.render(`High Score: ${this.highScore} ast ${this.lowestTime} tu`);
  }

  /** @function update
   *  Updates all the entities in the game.
   */
  update() {
    let result = this.ent.update(this.elapseCounter, this.score);

    this.vfx.update();

    for (let visual of result.visuals) {
      switch (visual.type) {
        case "explosion":
          this.vfx.explosion(visual.data);
          break;
        case "clouds":
          for (let cloud of visual.data) {
            this.vfx.cloud(cloud);
          }
          break;
        default:
          console.log("unknown visual effect");
          break;
      }
    }

    for (let channel in result.sounds) {
      this.sfx.play(channel, result.sounds[channel]);
    }

    this.score = result.score;

    this.state = result.state;
  }
}
