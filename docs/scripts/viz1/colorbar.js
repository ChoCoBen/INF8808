import * as viz1 from './viz1'

/**
 * @param {*} graph SVG graph object
 */
export function createColorGradient (graph) {
  var gradient = graph.append('linearGradient')
    .attr('id', 'svgGradient')
    .attr('x1', '100%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%')
  gradient.append('stop')
    .attr('class', 'start')
    .attr('offset', '0%')
    .attr('stop-color', viz1.colorMax)
    .attr('stop-opacity', 1)
  gradient.append('stop')
    .attr('class', 'end')
    .attr('offset', '100%')
    .attr('stop-color', viz1.colorMin)
    .attr('stop-opacity', 1)
}

/**
 * @param {*} graph SVG graph object
 * @param {*} _graphSize Dimentions of the SVG displayed
 */
export function drawColorBar (graph, _graphSize) {
  createColorGradient(graph)
  graph.append('rect')
    .attr('x', _graphSize.width / 2)
    .attr('y', 0)
    .attr('height', _graphSize.height + 90)
    .attr('width', 25)
    .attr('fill', 'url(#svgGradient)')
}

/**
 * @param {*} minValue Minimum value on the scale of the color bar
 * @param {*} maxValue Maximum value on the scale of the color bar
 * @param {*} graph SVG graph object
 */
export function colorBarRangeText (minValue, maxValue, graph) {
  graph.selectAll('#legend-range').remove()
  graph.append('text')
    .attr('x', 320)
    .attr('y', 10)
    .attr('id', 'legend-range')
    .text(maxValue)
  graph.append('text')
    .attr('x', 330)
    .attr('y', 450)
    .attr('id', 'legend-range')
    .text(minValue)
}
