import * as preprocess from './preprocess3.js'

/**
 * Draws the circles in the graph
 *
 * @param {*} g the graph where the circle has to be drawn
 * @param {Array} data the data that are used to draw the circles
 * @param {*} xScale the scale to place the circle at the good width
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} radiusScale the scale for the radius of the circles
 * @param {*} colorScale the scale used to fill the circles
 */
export function drawBubble (g, data, xScale, yScale, radiusScale, colorScale) {
  g.selectAll('circle').remove()
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
    .style('stroke', '#D4D4D4')
    .style('stroke-width', '1px')
}

/**
 * Draws the circles in the graph with one color but use both data from 2019 and 2021
 *
 * @param {*} g the graph where the circle has to be drawn
 * @param {Array} data2019 the data that are used to draw the circles from 2019
 * @param {Array} data2021 the data that are used to draw the circles from 2021
 * @param {*} xScale the scale to place the circle at the good widht
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} radiusScale the scale for the radius of the circles
 * @param {*} colorScale the scale used to fill the circles
 * @param {string} skillLevel the only skill level that we want to draw
 * @param {Array} skills the different skills
 */
export function drawBubbleEvolution (g, data2019, data2021, xScale, yScale, radiusScale, colorScale, skillLevel, skills) {
  data2019 = data2019.filter(element => element.niveau_de_competences === skillLevel)
  data2021 = data2021.filter(element => element.niveau_de_competences === skillLevel)
  g.selectAll('circle').remove()

  drawBubble(g, data2021, xScale, yScale, radiusScale, colorScale)
  var correspondingPercentage = preprocess.getCorrespondingPercentage(skills, data2021)

  g.selectAll('.data19')
    .data(data2019)
    .enter()
    .append('circle')
    .attr('class', 'data19')
    .style('stroke', '#000000')
    .style('stroke-width', '2px')
    .attr('r', function (d) {
      return Math.sqrt(radiusScale(d.emploi_estimé) / Math.PI)
    })
    .attr('cx', function (d) {
      return xScale(d['Genre de compétences']) + (xScale.bandwidth() / 2)
    })
    .attr('cy', function (d) {
      return yScale(correspondingPercentage[d['Genre de compétences']])
    })
    .attr('fill', function (d) {
      return colorScale(d.niveau_de_competences)
    })
    .style('opacity', 0.7)
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .attr('cy', function (d) {
      return yScale(d.pourcentage)
    })
}
