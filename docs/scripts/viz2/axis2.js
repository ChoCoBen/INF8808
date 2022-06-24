/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x-axis')

  g.append('g')
    .attr('class', 'y-axis')
}

/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Années')
    .attr('class', 'y-axis-text')
    .attr('font-size', 12)
    .attr('transform', 'translate( 280, ' + 420 + ')')

  g.append('text')
    .text('Nombre d\'emplois')
    .attr('class', 'x-axis-text')
    .attr('font-size', 12)
    .attr('transform', 'rotate(-90) translate( -200, -60 )')
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (xScale, height) {
  d3.select('.x-axis')
    .attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale))
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}
