import * as preprocess from './preprocess2.js'
import * as axis from './axis2.js'
import * as scales from './scales.js'
import * as tooltip from './tooltip.js'
import * as legend from './legend.js'
import * as bars from './bars.js'
import * as button from './button.js'
import d3Tip from 'd3-tip'

/**
 * Build the second vizualisation
 *
 * @param {*} g the d3 selection of the graph
 * @param graphSize
 */
export function build (g, graphSize) {
  g.selectAll('*').remove()
  button.drawButtons(g)

  axis.appendAxes(g)
  axis.appendGraphLabels(g)
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  d3.select('g').call(tip)
  d3.csv('./par_industrie_2019.csv').then((data2019) => {
    d3.csv('./par_industrie_2021.csv').then((data2021) => {
      const data1 = preprocess.filterRegion(data2019)
      const data2 = preprocess.filterRegion(data2021)
      const ind = preprocess.getIndustries(data1, data2)

      const xScale = scales.setXScale()
      const yScale = scales.setYScale(graphSize.height, ind)
      var colors = ['#0048BA', '#3B7A57', '#665D1E', '#9F2B68', '#FBCEB1', '#89CFF0']
      legend.drawLegend(colors, g, graphSize.width)
      axis.drawXAxis(xScale, graphSize.height)
      axis.drawYAxis(yScale, graphSize.height)

      // draw bars
      bars.drawBars(g, ind, xScale, yScale, tip, colors, graphSize)
    })
  })
}
