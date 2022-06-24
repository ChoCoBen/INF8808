/**
 * Defines the linear scale to use for the circle's radius.
 *
 * The area of the circle is linearly proportinal to the population of the given country.
 *
 * The area is a value defined in the interval [25, 400].
 *
 * @param {object} data2019 The data from 2019 to be displayed
 * @param {object} data2021 The data from 2021 to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data2019, data2021) {
  const min2019 = d3.min(data2019, function (obj) {
    return Math.min(obj.emploi_estimé)
  })

  const max2019 = d3.max(data2019, function (obj) {
    return Math.max(obj.emploi_estimé)
  })

  const min2021 = d3.min(data2021, function (obj) {
    return Math.min(obj.emploi_estimé)
  })

  const max2021 = d3.max(data2021, function (obj) {
    return Math.max(obj.emploi_estimé)
  })

  const domain = [Math.min(min2019, min2021), Math.max(max2019, max2021)]
  return d3.scaleLinear().range([25, 800]).domain(domain)
}

/**
 * Defines the band scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} skills The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, skills) {
  return d3.scaleBand().range([0, width]).domain(skills)
}

/**
 * Defines the linear scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @returns {*} The linear scale in Y
 */
export function setYScale (height) {
  return d3.scaleLinear().range([height, 0]).domain([0, 1])
}

/**
 * Defines the color scale used to fill the circles
 *
 * @returns {*} The ordinal scale in color
 */
export function setColorScale () {
  return d3.scaleOrdinal().range(['red', 'orange', 'yellow']).domain(['Haut. Qualifié', 'Qualifié', 'Moins Qualifié'])
}
