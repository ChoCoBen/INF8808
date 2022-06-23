/**
 * Draws the circles in the graph
 *
 * @param {*} g the graph where the circle has to be drawn
 * @param {Array} data the data that are used to draw the circles
 * @param {*} xScale the scale to place the circle at the good widht
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} radiusScale the scale for the radius of the circles
 * @param {*} colorScale the scale used to fill the circles
 */
export function drawBubble (g, data, xScale, yScale, radiusScale, colorScale) {
  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', function (d) {
      return Math.sqrt(radiusScale(d.emploi_estimé) / Math.PI)
    })
    .attr('cx', function (d) {
      return xScale(d['Genre de compétences']) + (xScale.bandwidth() / 2)
    })
    .attr('cy', function (d) {
      return yScale(d.pourcentage)
    })
    .attr('fill', function (d) {
      return colorScale(d.niveau_de_competences)
    })
}
