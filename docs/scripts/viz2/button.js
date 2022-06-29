/**
 * Draws the reset button
 *
 * @param {*} g the graph
 *
 */
export function drawButtons (g) {
  const button1 = g.append('g')
    .attr('class', 'button22')
    .attr('id', 'button22')
    .attr('transform', 'translate(640, 140)')
    .attr('width', 130)
    .attr('height', 25)

  const buttons = d3.selectAll('.button22 ')

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

  designButtons(button1, 'Reset')
}

/**
 * Sets the appearance of the button
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
