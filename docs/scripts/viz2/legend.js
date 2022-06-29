/**
 * Draws the legend.
 *
 * @param {*} colors The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colors, g, width) {
  g.append('text')
    .text('Cliquez sur les barres pour')
    .attr('font-size', 12)
    .attr('transform', 'translate(645 ,200)')

  g.append('text')
    .text('obtenir un affichage détaillé')
    .attr('font-size', 12)
    .attr('transform', 'translate(645,220)')

  var legend = g.selectAll('.legend')
    .data(colors)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) { return 'translate(-180,' + i * 19 + ')' })

  legend.append('rect')
    .attr('x', width - 18)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', function (d, i) { return colors.slice().reverse()[i] })

  legend.append('text')
    .attr('x', width + 5)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .text(function (d, i) {
      switch (i) {
        case 0: return 'Culture'
        case 1: return 'Industries'
        case 2: return 'Exploitation de ressources'
        case 3: return 'Technologies et finance'
        case 4: return 'Service publique'
        case 5: return 'Commerce'
      }
    })
}
