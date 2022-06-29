import * as preprocess from './preprocess3.js'
import * as axis from './axis3.js'
import * as scales from './scales.js'
import * as bubble from './bubble.js'
import * as tooltip from './tooltip.js'
import * as legend from './legend.js'
import * as helper from '../helper.js'

import d3Tip from '../../node_modules/d3-tip/index.js'

/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 * @param {*} graphSize object containing the size of the graph
 */
export function build (g, graphSize) {
  g.selectAll('*').remove()
  helper.addFooter(g)

  g.append('text').text('Distribution des emplois par genre de compétences')
    .attr('x', graphSize.width / 2)
    .attr('y', -75)
    .attr('class', 'vizTitle')

  var width = graphSize.width - 220

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  g.call(tip)

  d3.csv('./par_profession_2019.csv').then((data2019) => {
    d3.csv('./par_profession_2021.csv').then((data2021) => {
      data2019 = preprocess.filterRegion(data2019)
      data2021 = preprocess.filterRegion(data2021)

      var skills = preprocess.getSkills(data2019)
      data2019 = preprocess.structureData(data2019, skills)
      data2021 = preprocess.structureData(data2021, skills)

      axis.appendAxes(g)
      axis.appendGraphLabels(g, width, graphSize.height)

      var radiusScale = scales.setRadiusScale(data2019, data2021)
      var colorScale = scales.setColorScale()
      var xScale = scales.setXScale(width, skills)
      var yScale = scales.setYScale(graphSize.height)

      axis.drawXAxis(xScale, graphSize.height)
      axis.drawYAxis(yScale)
      axis.rotateXTicks()

      addLine(g, xScale, skills, graphSize.height)

      bubble.drawBubble(g, data2021, xScale, yScale, radiusScale, colorScale)
      tooltip.setCircleHoverHandler(tip)

      legend.drawLegend(colorScale, g, width + 50)
      legend.addComments(g, width + 50)
      legend.drawYearLegend(g, width + 50)
      activateButton(g, data2019, data2021, xScale, yScale, radiusScale, colorScale, skills, tip, width)
      drawResetButton(g, width + 50, data2021, xScale, yScale, radiusScale, colorScale, tip)
    })
  })
}

/**
 * Activate the buttons used to select just one skill level to display
 *
 * @param {*} g the graph where the circles are drawn
 * @param {Array} data2019 the data from 2019
 * @param {Array} data2021 the data from 2021
 * @param {*} xScale the scale to place the circle at the good width
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} radiusScale the scale for the radius of the circles
 * @param {*} colorScale the scale used to fill the circles
 * @param {Array} skills the list of different skills
 * @param {*} tip the tooltip
 * @param {number} width the width of the graph
 */
export function activateButton (g, data2019, data2021, xScale, yScale, radiusScale, colorScale, skills, tip, width) {
  d3.selectAll('.cell')
    .on('click', function () {
      var skillLevel = d3.select(this).select('.label')._groups[0][0].__data__
      bubble.drawBubbleEvolution(g, data2019, data2021, xScale, yScale, radiusScale, colorScale, skillLevel, skills)
      tooltip.setCircleHoverHandler(tip)
      legend.drawYearLegend(g, width + 50)
    })
}

/**
 * Draw the button to reset the graph
 *
 * @param {*} g the graph
 * @param {number} width the width of the graph
 * @param {Array} data the data that are used to draw the circles
 * @param {*} xScale the scale to place the circle at the good width
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} radiusScale the scale for the radius of the circles
 * @param {*} colorScale the scale used to fill the circles
 * @param {*} tip the tooltip
 */
export function drawResetButton (g, width, data, xScale, yScale, radiusScale, colorScale, tip) {
  var button = g.append('g')
    .attr('class', 'button')
    .attr('transform', 'translate(' + width + ', 100)')
    .attr('width', 80)
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

  helper.designButtons(button, 'Reset')

  button.on('click', () => {
    bubble.drawBubble(g, data, xScale, yScale, radiusScale, colorScale)
    tooltip.setCircleHoverHandler(tip)
    legend.drawYearLegend(g, width)
  })
}

/**
 * Add line in X to distinguish easily the skills
 *
 * @param {*} g the graph
 * @param {*} xScale the scale in x for the graph
 * @param {*} skills the list of skills
 * @param {number} height the height of the graph
 */
export function addLine (g, xScale, skills, height) {
  g.selectAll('rect')
    .data(skills)
    .enter()
    .append('rect')
    .attr('fill', 'grey')
    .attr('x', function (d) {
      return xScale(d) + (xScale.bandwidth() / 2)
    })
    .attr('width', 1)
    .attr('height', height)
    .style('opacity', 0.4)
}
