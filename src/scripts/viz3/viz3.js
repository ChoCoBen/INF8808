import * as preprocess from './preprocess3.js'
import * as axis from './axis3.js'
import * as scales from './scales.js'
import * as bubble from './bubble.js'
import * as tooltip from './tooltip.js'
import * as legend from './legend.js'

import d3Tip from 'd3-tip'

/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 * @param {*} graphSize object containing the size of the graph
 */
export function build (g, graphSize) {
  g.selectAll('*').remove()

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
      axis.appendGraphLabels(g)

      var radiusScale = scales.setRadiusScale(data2019, data2021)
      var colorScale = scales.setColorScale()
      var xScale = scales.setXScale(width, skills)
      var yScale = scales.setYScale(graphSize.height)

      axis.drawXAxis(xScale, graphSize.height)
      axis.drawYAxis(yScale)
      axis.rotateXTicks()

      bubble.drawBubble(g, data2021, xScale, yScale, radiusScale, colorScale)
      tooltip.setCircleHoverHandler(tip)

      legend.drawLegend(colorScale, g, width + 50)
    })
  })
}
