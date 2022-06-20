/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 */
export function build (g) {
  g.selectAll('*').remove()
  g.append('text').text('DDDD')
}
