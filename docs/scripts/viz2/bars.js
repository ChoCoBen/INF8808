import * as axis from './axis2.js'
import * as scales from './scales.js'
import * as legend from './legend.js'
import * as viz2 from './viz2.js'

/**
 * Draws the bars in the graph
 *
 * @param {*} g the graph where the bar has to be drawn
 * @param {Array} ind the data that are used to draw the barss
 * @param {*} xScale the scale to place the circle at the good widht
 * @param {*} yScale the scale to place the circle at the good height
 * @param {*} tip the tip
 * @param {Array} colors color used to color the bars
 * @param {*} graphSize dimension of the graph
 */
export function drawBars (g, ind, xScale, yScale, tip, colors, graphSize) {
  const keys = Object.keys(ind[0]).slice(1)
  var stackedData = d3.stack()
    .keys(keys)(ind)
  g.selectAll('g.bars')
    .data(stackedData)
    .enter()
    .append('g')
    .style('fill', function (d, i) { return colors[i] })
    .selectAll('rect')
    .data(function (d) { return d })
    .enter()
    .append('rect')
    .attr('x', function (d) { return xScale(d.data.year) + 25 })
    .attr('y', function (d) { return yScale(d[1]) })

    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]) })
    .attr('width', 100)
    .attr('class', 'rec')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on('click', (d) => {
      tip.hide()
      detail(g, d, ind, colors, graphSize, xScale, tip)
    })
}

/**
 * Draws the bars of the data of the clicked element
 *
 * @param {*} g the graph where the bar has to be drawn
 * @param {*} d data from the click
 * @param {Array} ind the data that are used to draw the barss
 * @param {Array} colors color used to color the bars
 * @param {*} graphSize dimension of the graph
 * @param {*} xScale the scale to place the circle at the good widht
 * @param {*} tip for the tooltip
 */
export function detail (g, d, ind, colors, graphSize, xScale, tip) {
  setClickHandler(g, graphSize)
  const keys = Object.keys(ind[0])
  const val = d[1] - d[0]
  const idx = Object.values(d.data).indexOf(val)
  const singleStack = []
  Object.keys(ind).forEach((element) => {
    const temp = {}
    const name = keys[idx]
    temp.year = ind[element].year
    temp[name] = ind[element][keys[idx]]
    singleStack.push(temp)
  })
  const k = [keys[idx]]
  var stackedData = d3.stack()
    .keys(k)(singleStack)
  g.selectAll('.rec').remove()
  g.selectAll('.legend').remove()
  const yScale = scales.setAdaptedYScale(graphSize.height, d[1] - d[0])
  axis.drawYAxis(yScale, graphSize.height)
  legend.drawLegend(colors, g, graphSize.width)
  g.selectAll('g.bars')
    .data(stackedData)
    .enter()
    .append('g')
    .style('fill', function () { return colors[idx - 1] })
    .selectAll('rect')
    .data(function (d) { return d })
    .enter()
    .append('rect')
    .attr('x', function (d) { return xScale(d.data.year) + 25 })
    .attr('y', function (d) { return yScale(d[1]) })
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]) })
    .attr('width', 100)
    .attr('class', 'rec')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}

/**
 * Handle the reset button
 *
 * @param {*} g the graph where the circle has to be drawn
 * @param {*} graphSize dimension of the graph
 */
export function setClickHandler (g, graphSize) {
  d3.select('.button22')
    .on('click', () => {
      viz2.build(g, graphSize)
    })
}
