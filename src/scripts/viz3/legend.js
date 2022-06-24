import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  g.append('g')
    .attr('class', 'legendOrdinal')
    .attr('transform', 'translate(' + width + ',0)')

  var legendOrdinal = d3Legend.legendColor()
    .shape('path', d3.symbol().type(d3.symbolCircle).size(200)())
    .shapePadding(10)
    .cellFilter(function (d) { return d.label !== 'e' })
    .scale(colorScale)
    .title('Légende')

  g.select('.legendOrdinal')
    .call(legendOrdinal)
}

/**
 * Add some comments to the legend
 *
 * @param {*} g the graph
 * @param {number} width the width of the graph
 */
export function addComments (g, width) {
  g.append('text')
    .text('Cliquez sur les éléments')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',170)')

  g.append('text')
    .text('de la légende pour gérer')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',190)')

  g.append('text')
    .text("l'affichage")
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',210)')

  g.append('text')
    .text('E.D.S.C: Enseignement, droit,')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',310)')

  g.append('text')
    .text('serv. sociaux, communautaires')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',330)')

  g.append('text')
    .text('et gouvernement')
    .attr('font-size', 12)
    .attr('transform', 'translate(' + width + ',350)')
}

/**
 * Add the legend to distinguish data from 2019 and 2021
 *
 * @param {*} g the graph
 * @param {number} width the width of the graph
 */
export function drawYearLegend (g, width) {
  var widthText = width + 25
  g.selectAll('.legendYear').remove()

  g.append('circle')
    .attr('fill', 'white')
    .style('stroke', '#D4D4D4')
    .style('stroke-width', '1px')
    .attr('r', 10)
    .attr('cx', width)
    .attr('cy', 240)

  g.append('text')
    .attr('class', 'legendYear')
    .text('Données de 2021')
    .attr('transform', 'translate(' + widthText + ', 245)')

  g.append('circle')
    .attr('fill', 'white')
    .style('stroke', '#000000')
    .style('stroke-width', '2px')
    .attr('r', 10)
    .attr('cx', width)
    .attr('cy', 270)

  g.append('text')
    .attr('class', 'legendYear')
    .text('Données de 2019')
    .attr('transform', 'translate(' + widthText + ', 275)')
}
