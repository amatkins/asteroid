/* mediaController.js */

import bounce_sfx from "./bounce.wav";
import shoot_sfx from "./shoot.wav";
import crack_sfx from "./crack.wav";
import break_sfx from "./break.wav";
import death_sfx from "./death.wav";

/** @class MediaController
 *  A controller for the sound effects in the game.
 *  @type {MediaController}
 */
export default class MediaController {
  /** @constructor
   *  Constructs a sound constroller with all the imported sound effects.
   */
  constructor() {
    this.player = document.createElement("audio");
    document.body.appendChild(this.player);
    this.tracks = [bounce_sfx, shoot_sfx, crack_sfx, break_sfx, death_sfx];
  }

  /** @function play
   *  Plays the specified sound effect from the beginning.
   *  @param  {Number} track The sound to play.
   */
  play(track) {
    switch (track) {
      case "bounce":
        this.player.src = this.tracks[0];
        this.player.currentTime = 0;
        break;
      case "shoot":
        this.player.src = this.tracks[1];
        this.player.currentTime = 0;
        break;
      case "crack":
        this.player.src = this.tracks[2];
        this.player.currentTime = 0;
        break;
      case "break":
        this.player.src = this.tracks[3];
        this.player.currentTime = 0;
        break;
      case "death":
        this.player.src = this.tracks[4];
        this.player.currentTime = 0;
        break;
      default:
        break;
    }
    this.player.play();
  }

  /** @function pause
   *  Pauses the current sound playing.
   */
  pause() {
    this.player.pause();
  }
}
