/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('.graph')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('.main-svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Draws the buttons to choose the graph displayed.
 *
 * @param {number} width The width of the svg, used to place the button
 */
export function drawButtons (width) {
  const g = d3.select('.main-svg')
  const button1 = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button1')
    .attr('transform', 'translate(' + width / 6 + ', 50)')
    .attr('width', 130)
    .attr('height', 25)

  const button2 = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button2')
    .attr('transform', 'translate(' + width / 2 + ', 50)')
    .attr('width', 130)
    .attr('height', 25)

  const button3 = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button3')
    .attr('transform', 'translate(' + 5 * width / 6 + ', 50)')
    .attr('width', 130)
    .attr('height', 25)

  const buttons = d3.selectAll('.button')

  buttons.append('rect')
    .attr('width', 130)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  designButtons(button1, 'Viz 1')
  designButtons(button2, 'Viz 2')
  designButtons(button3, 'Viz 3')
}

/**
 * Sets the appearance of the buttons
 *
 * @param {*} button The d3 selection for the button
 * @param {string} text The text to put in the button
 */
export function designButtons (button, text) {
  button.append('text')
    .attr('x', 65)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text(text)
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}
