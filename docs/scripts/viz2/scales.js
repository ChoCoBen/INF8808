/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @returns {*} The linear scale in X
 */
export function setXScale () {
  return d3.scaleBand().range([0, 600]).domain(['2019', '2021', '2023', '2025'])
}

/**
 * Defines the scale used to position the bars in Y.
 *
 * @param {*} height height of the graph
 * @returns {*} The linear scale in Y
 */
export function setYScale (height) {
  return d3.scaleLinear().range([0, height]).domain([5500000, 0])
}

/**
 * Defines the scale used to position the bar when one click on it
 *
 * @param {*} height height of the graph
 * @param {*} val value of the clicked element
 * @returns {*} The linear scale in Y
 */
export function setAdaptedYScale (height, val) {
  const v = String(val).length - 1
  const dam = Math.ceil(val / 10 ** v) * 10 ** v
  return d3.scaleLinear().range([0, height]).domain([dam, 0])
}
