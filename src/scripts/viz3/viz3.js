import * as preprocess from './preprocess3.js'
import * as axis from './axis3.js'

/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 */
export function build (g) {
  g.selectAll('*').remove()
  d3.csv('./par_profession_2019.csv').then((data2019) => {
    d3.csv('./par_profession_2021.csv').then((data2021) => {
      data2019 = preprocess.filterRegion(data2019)
      data2021 = preprocess.filterRegion(data2021)

      var skills = preprocess.getSkills(data2019)
      data2019 = preprocess.structureData(data2019, skills)
      data2021 = preprocess.structureData(data2021, skills)

      axis.appendAxes(g)
    })
  })
  g.append('text').text('CCCCC')
}
