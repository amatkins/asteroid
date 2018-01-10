/* sfxController.js */

import beep_sfx from "./beep.wav";
import powerup_sfx from "./powerup.wav";
import thruster_sfx from "./thruster.wav";
import shoot_sfx from "./shoot.wav";
import death_sfx from "./death.wav";
import bounce_sfx from "./bounce.wav";
import crack_sfx from "./crack.wav";
import break_sfx from "./break.wav";

/** @class SFXController
 *  The controller for the sound effects of the game.
 *  @type {SFXController}
 */
export default class SFXController {
  /** @constructor
   *  Constructs a sound constroller with all the imported sound effects.
   */
  constructor() {
    // Create channels
    this.channels = {
      "ui": document.createElement("audio"),
      "ship": document.createElement("audio"),
      "asteroids": document.createElement("audio")
    };
    // Append to the webpage
    document.body.appendChild(this.channels["ui"]);
    document.body.appendChild(this.channels["ship"]);
    document.body.appendChild(this.channels["asteroids"]);
    // Create track list
    this.tracks = {
      "beep": beep_sfx,
      "powerup": powerup_sfx,
      "thruster": thruster_sfx,
      "shoot": shoot_sfx,
      "death": death_sfx,
      "bounce": bounce_sfx,
      "crack": crack_sfx,
      "break": break_sfx
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  /** @function play
   *  Plays the specified sound effect from the beginning.
   *  @param  {String} channel  The channel to play on.
   *  @param  {String} track    The sound to play.
   */
  play(channel, track) {
    channel = this.channels[channel];
    track = this.tracks[track];
    // Change the track and play
    if (!channel.paused)
      channel.pause();

    if (channel.src !== track) {
      channel.src = track;
      channel.currentTime = 0;
    }
    channel.play();
  }

  /** @function pause
   *  Pauses the current sound playing.
   *  @param  {String}  channel The channel (or all channels) to pause.
   */
  pause(channel) {
    if (channel === "all") {
      for (let chan in this.channels) {
        this.channels[chan].pause();
      }
    }
    else
      this.channels[channel].pause();
  }
}
