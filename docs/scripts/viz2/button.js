/**
 * Draws the buttons to choose the graph displayed.
 *
 * @param {number} width The width of the svg, used to place the button
 * @param {*} g the graph
 */
export function drawButtons (g) {
  const button = g.append('g')
    .attr('class', 'button22')
    .attr('id', 'button22')
    .attr('transform', 'translate(651, 130)')
    .attr('width', 130)
    .attr('height', 25)

  button.append('rect')
    .attr('width', 130)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  designButtons(button, 'Reset')
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
