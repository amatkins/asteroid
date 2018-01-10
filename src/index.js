import "./index.css";
import Game from "./game.js";

let length = Math.min(window.innerWidth, window.innerHeight);
new Game(length / 2.5, length / 2.5, length / 40);
