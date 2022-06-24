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
 * @param {number} width the width of the graph
 * @param {number} height the height of the graph
 */
export function appendGraphLabels (g, width, height) {
  var dy = -height / 2
  var dx = width + 50

  g.append('text')
    .text("Pourcentage d'emplois par niveau de qualification")
    .attr('class', 'axis-title')
    .attr('font-size', 12)
    .attr('transform', 'rotate(-90) translate(' + dy + ', -50)')

  g.append('text')
    .text('Genre de')
    .attr('class', 'axis-title')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + dx + ',' + (height - 5) + ')')

  g.append('text')
    .text('compétences')
    .attr('class', 'axis-title')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + dx + ',' + (height + 15) + ')')
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
    .call(d3.axisLeft(yScale))
}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
export function rotateXTicks () {
  d3.select('.x-axis')
    .selectAll('text')
    .attr('class', 'axis-text')
    .attr('transform', function () {
      var dy = -d3.select(this)._groups[0][0].__data__.length * 2.4
      return 'rotate(-90) translate(' + dy + ',0)'
    })
    .style('font-weight', 'bold')
}
