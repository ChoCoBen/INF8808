import * as preprocess from './preprocess1.js'
import * as colorbar from './colorbar.js'
import * as selectionboxes from './selectionboxes.js'
import * as map from './map.js'
import * as helper from '../helper.js'

const colorMin = '#ffffff'
const colorMax = '#f70d1a'

export { colorMin }
export { colorMax }

/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 * @param {*} graphSize an object containing the size of the graph and margins
 */
export function build (g, graphSize) {
  g.selectAll('*').remove()
  helper.addFooter(g)

  g.append('text').text("L'offre d'emploi par région et par industrie")
    .attr('x', graphSize.width / 2)
    .attr('y', -75)
    .attr('class', 'vizTitle')
  d3.csv('./par_industrie_2019.csv').then((data2019) => {
    d3.csv('./par_industrie_2021.csv').then((data2021) => {
      d3.json('./quebec_regions.geojson').then((mapData) => {
        var industry = 'Total'
        var year = 2018
        data2019 = preprocess.adjustIndustryNames(data2019)
        data2021 = preprocess.adjustIndustryNames(data2021)
        data2021 = preprocess.adjustRegions2021(data2021)

        selectionboxes.createSelectionBox(g, data2019, data2021, graphSize, mapData)
        colorbar.drawColorBar(g, graphSize)
        map.drawMap(g, industry, year, graphSize, mapData, data2019, data2021)
      })
    })
  })
}
