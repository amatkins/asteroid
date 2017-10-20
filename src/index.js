import './index.css';
import Controller from './controller';

var length = Math.min(window.innerWidth, window.innerHeight);
var controller = new Controller(length / 2.5, length / 2.5, length / 40);
