import * as legend from './legend.js'
import * as viz2 from './viz2.js'

/**
 * Draws the circles in the graph
 *
 * @param {*} g the graph where the circle has to be drawn
 * @param {Array} ind the data
 * @param {*} xScale the scale to place the circle at the good widht
 * @param {*} yScale the scale to place the circle at the good height
 * @param tip
 * @param colors
 * @param graphSize
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
    .attr('class', 'square')
    .attr('x', function (d) { return xScale(d.data.year) + 25 })
    .attr('y', function (d) { return yScale(d[1]) })

    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]) })
    .attr('width', 100)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .on('click', (d) => {
      tip.hide()
      test(g, d, ind, colors, graphSize, xScale, yScale, tip)
    })
}

/**
 * @param g
 * @param d
 * @param ind
 * @param colors
 * @param graphSize
 * @param xScale
 * @param yScale
 * @param tip
 */
export function test (g, d, ind, colors, graphSize, xScale, yScale, tip) {
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
  g.selectAll('.square').remove()
  g.selectAll('.legend').remove()

  setClickHandler(g, graphSize)
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
    .attr('class', 'square')
    .attr('x', function (d) { return xScale(d.data.year) + 25 })
    .attr('y', function (d) { return yScale(d[1]) })

    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]) })
    .attr('width', 100)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}

/**
 * @param {*} g the graph
 * @param {*} graphSize object containing every size of the graph
 */
export function setClickHandler (g, graphSize) {
  d3.select('.button22')
    .on('click', () => {
      viz2.build(g, graphSize)
    })
}
