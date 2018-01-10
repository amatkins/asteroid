/* vector2D.js */

/** @function construct
 *  Constructs a new 2D vector using either coordinates or magnitude and angle.
 *  @param  {Number}   a         The x coordinate or the magnitude.
 *  @param  {Number}   b         The y coordinate or the angle.
 *  @param  {Boolean}  coord     Whether to use coordinates (true) or magnitude and angle (false).
 *  @return {Object}             The 2D vector containing the provided data.
 */
export function construct(a, b, coord = true) {
  return {
    x: coord ? a : a * Math.cos(b),
    y: coord ? b : a * Math.sin(b)
  };
}

/** @function add
 *  Adds two vectors together.
 *  @param  {Object}  a   The left operand vector.
 *  @param  {Object}  b   The right operand vector.
 *  @return {Object}      The result of the addition.
 */
export function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

/** @function angle
 *  Finds the angle of a vector.
 *  @param {Object} a   The vector to negate.
 *  @return {Number}    The angle, in radians, to rotate the vector.
 */
export function angle(a) {
  return Math.atan2(a.y, a.x);
}

/** @function dot
 *  Sums the products of the individual units of two vectors.
 *  @param  {Object} a   The left operand vector.
 *  @param  {Object} b   The right operand vector.
 *  @return {Number}       The dot product of this and another vector.
 */
export function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

/** @function negate
 *  Negates the units of this vector.
 *  @param  {Object} a   The vector to negate.
 *  @return {Object}     The negated vector.
 */
export function negate(a) {
  return { x: -a.x, y: -a.y };
}

/** @function norm
 *  Finds the magnitude of this vector.
 *  @param  {Object} a   The vector to normalize.
 *  @return {Number}     The magnitude of this vector.
 */
export function norm(a) {
  return Math.sqrt(a.x ** 2 + a.y ** 2);
}

/** @function pow
 *  Performs an exponential operation on each unit of a vector.
 *  @param  {Object}   a   The left operand vector.
 *  @param  {Number}   p   The exponential value.
 *  @return {Object}       The result of the operation.
 */
export function pow(a, p) {
  return { x: a.x ** p, y: a.y ** p };
}

/** @function rotate
 *  Rotates a vector about the origin.
 *  @param  {Object}    a       The vector to rotate.
 *  @param  {Number}    theta   The angle, in radians, to rotate by.
 *  @return {Object}            The result of rotating this vector.
 */
export function rotate(a, theta) {
  return {
    x: Math.cos(theta) * a.x - Math.sin(theta) * a.y,
    y: Math.sin(theta) * a.x + Math.cos(theta) * a.y
  };
}

/** @function scale
 *  Scale a vector by a constant.
 *  @param  {Object}   a   The left operand vecotr.
 *  @param  {Number}   s   The scaler amount.
 *  @return {Vector2D}     The result of scaling the vector.
 */
export function scale(a, s) {
  return { x: a.x * s, y: a.y * s };
}

/** @function sub
 *  Subtracts one vector from another.
 *  @param  {Object}   a   The left operand vecotr.
 *  @param  {Object}   b   The right operand vector.
 *  @return {Object}       The result of the subtraction.
 */
export function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

/** @function trim
 *  Trims the magnitude of this vector to a certain max value.
 *  @param  {Object} a   The vector to trim.
 *  @param  {Number} b   The max value the magnitude should be.
 *  @return {Object}     The result of attempting to trim the vector.
 */
export function trunc(a, m) {
  var nrm = Math.sqrt(a.x ** 2 + a.y ** 2);
  if (nrm > m)
    return { x: a.x * m / nrm, y: a.y * m / nrm };
  else return a;
}

/** @function unit
 *  Transforms this vector into a unit vector.
 *  @param  {Object} a    The vector to make unit length.
 *  @return {Object}      The result of scaling the vector to unit length.
 */
export function unit(a) {
  var nrm = Math.sqrt(a.x ** 2 + a.y ** 2);
  return { x: a.x / nrm, y: a.y / nrm };
}

/** @function wrap
 *  Clamps this vector to be between the values specified in two other vectors.
 *  @param  {Object} a   The vector to wrap.
 *  @param  {Object} w   The vector containing the max and min values for the x coordinate.
 *  @param  {Object} h   The vector containing the max and min values for the y coordinate.
 *  @return {Object}     The wrapped vector.
 */
export function wrap(a, w, h) {
  return {
    x: (w.y + a.x - 2 * w.x) % (w.y - w.x) + w.x,
    y: (h.y + a.y - 2 * h.x) % (h.y - h.x) + h.x
  };
}
