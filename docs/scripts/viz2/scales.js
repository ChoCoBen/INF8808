/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @returns {*} The linear scale in X
 */
export function setXScale () {
  return d3.scaleBand().range([0, 600]).domain(['2019', '2021', '2023', '2025'])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param height
 * @returns {*} The linear scale in Y
 */
export function setYScale (height) {
  return d3.scaleLinear().range([0, height]).domain([5000000, 0])
}
