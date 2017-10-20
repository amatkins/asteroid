/* vector2D.js */

/** @class Vector2D
 *  A 2D vector that has basic vector mathematical functionality.
 *  It can be created either as coordinates or magnitude and direction.
 *  It is internally stored as coordinates regardless.
 *  @type {Vector2D}
 */
export default class Vector2D {
  /** @constructor
   *  Constructs a new 2D vector using either coordinates or magnitude and angle.
   *  @param  {Number}   a         The x coordinate or the magnitude.
   *  @param  {Number}   b         The y coordinate or the angle.
   *  @param  {Boolean}  coord     Whether to use coordinates (true) or magnitude and angle (false).
   */
  constructor(a, b, coord = true) {
    this.x = coord ? a : a * Math.cos(b);
    this.y = coord ? b : a * Math.sin(b);
  }

  /** @function add
   *  Adds another vector to this one.
   *  @param  {Vector2D}  b   The vector to add to this one.
   *  @return {Vector2D}      The result of the addition.
   */
  add(b) {
    return new Vector2D(this.x + b.x, this.y + b.y);
  }

  /** @function trm
   *  Trims the magnitude of this vector to a certain max value.
   *  @param  {Number}    b   The max value the magnitude should be.
   *  @return {Vector2D}      The result of attempting to trim this vector.
   */
  trm(b) {
    if (this.nrm() > b)
      return this.sca(b / this.nrm());
    else return this;
  }

  /** @function cmp
   *  Clamps this vector to be between the values specified in two other vectors.
   *  @param  {Vector2D} w   The vector containing the max and min values for the x coordinate.
   *  @param  {Vector2D} h   The vector containing the max and min values for the y coordinate.
   *  @return {Vector2D}     The clamped vector.
   */
  cmp(w, h) {
    return new Vector2D(
      (w.y + this.x - 2 * w.x) % (w.y - w.x) + w.x,
      (h.y + this.y - 2 * h.x) % (h.y - h.x) + h.x
    );
  }

  /** @function dir
   *  Finds the angle of this vector.
   *  @return {Number}  The angle of this vector in radians.
   */
  dir() {
    return Math.atan(this.y / this.x);
  }

  /** @function dot
   *  Sums the products of the individual units of this and another vector.
   *  @param  {Vector2D} b   The vector to preform a dot product with.
   *  @return {Number}       The dot product of this and another vector.
   */
  dot(b) {
    return this.x * b.x + this.y * b.y;
  }

  /** @function neg
   *  Negates the units of this vector.
   *  @return {Vector2D}   The negated vector.
   */
  neg() {
    return new Vector2D(-this.x, -this.y);
  }

  /** @function nrm
   *  Finds the magnitude of this vector.
   *  @return {Number}   The magnitude of this vector.
   */
  nrm() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /** @function pow
   *  Performs an exponential operation on each unit of this vector.
   *  @param  {Number}   b   The exponential value.
   *  @return {Vector2D}     The result of the operation.
   */
  pow(b) {
    return new Vector2D(this.x ** b, this.y ** b);
  }

  /** @function rot
   *  Rotates this vector about the origin.
   *  @param  {Number}    theta   The angle to rotate this vector by.
   *  @return {Vector2D}          The result of rotating this vector.
   */
  rot(theta) {
    return new Vector2D(
      Math.cos(theta) * this.x - Math.sin(theta) * this.y,
      Math.sin(theta) * this.x + Math.cos(theta) * this.y
    );
  }

  /** @function sca
   *  Scale this vector by a constant.
   *  @param  {Number}   b   The amount to scale his vector by.
   *  @return {Vector2D}     The result of scaling this vector.
   */
  sca(b) {
    return new Vector2D(this.x * b, this.y * b);
  }

  /** @function sub
   *  Subtracts another vector from this one.
   *  @param  {Vector2D}  b   The vector to subtract from this one.
   *  @return {Vector2D}      The result of the subtraction.
   */
  sub(b) {
    return new Vector2D(this.x - b.x, this.y - b.y);
  }

  /** @function uni
   *  Transforms this vector into a unit vector.
   *  @return {Vector2D}   The result of scaling this vector to unit length.
   */
  uni() {
    var nrm = this.nrm();
    return new Vector2D(this.x / nrm, this.y / nrm);
  }
}
