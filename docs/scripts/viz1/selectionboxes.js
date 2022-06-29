import * as preprocess from './preprocess1.js'
import * as map from './map.js'

/**
 * @param {*} graph SVG element to draw on
 * @param {*} data2019 data of 2019 to draw select box
 * @param {*} data2021 data of 2021 to draw select box
 * @param {*} graphSize dimentions of SVG element
 * @param {*} mapData geoJSON object
 */
export function createSelectionBox (graph, data2019, data2021, graphSize, mapData) {
  var names2019 = preprocess.getIndustryNames(data2019)
  var names2021 = preprocess.getIndustryNames(data2021)

  var names = names2019.concat(names2021)
  names = names.filter((i, p) => names.indexOf(i) === p)
  var years = [2018, 2020]

  createIndustrySelectBox(graph, graphSize, data2019, data2021, mapData, names)
  createYearSelectBox(graph, graphSize, data2019, data2021, mapData, years)
}

/**
 * @param {*} graph SVG element to draw on
 * @param {*} graphSize dimentions of SVG element
 * @param {*} data2019 data of 2019 to draw select box
 * @param {*} data2021 data of 2021 to draw select box
 * @param {*} mapData geoJSON object
 * @param {*} years years of dropdownbox
 */
export function createYearSelectBox (graph, graphSize, data2019, data2021, mapData, years) {
  var labelsPosX = 500
  var labelsPosY = 200

  graph.append('text')
    .text('Année:')
    .attr('x', labelsPosX)
    .attr('y', labelsPosY - 5)

  var select = graph.append('foreignObject')
    .attr('width', 54)
    .attr('height', 19)
    .attr('x', labelsPosX)
    .attr('y', labelsPosY)
    .append('xhtml:body')
    .append('div')
    .append('select')
    .attr('id', 'dropdown-year')
    .on('change', function (d) {
      var selectedValue = d3.select('#dropdown-industry').property('value')
      var selectedYear = d3.select('#dropdown-year').property('value')
      graph.selectAll('.region').remove()
      map.drawMap(graph, selectedValue, selectedYear, graphSize, mapData, data2019, data2021)
    })
  select
    .selectAll('option')
    .data(years).enter()
    .append('option')
    .text(function (d) { return d })
    .property('selected', function (d) { return d === 'Total' })
}

/**
 * @param {*} graph SVG element to draw on
 * @param {*} graphSize dimentions of SVG element
 * @param {*} data2019 data of 2019 to draw select box
 * @param {*} data2021 data of 2021 to draw select box
 * @param {*} mapData geoJSON object
 * @param {*} names names of industries to select
 */
export function createIndustrySelectBox (graph, graphSize, data2019, data2021, mapData, names) {
  var labelsPosX = 500
  var labelsPosY = 50

  graph.append('text')
    .text('Industrie sélectionnée:')
    .attr('x', labelsPosX)
    .attr('y', labelsPosY - 5)

  var select = graph.append('foreignObject')
    .attr('width', 300)
    .attr('height', 19)
    .attr('x', labelsPosX)
    .attr('y', labelsPosY)
    .append('xhtml:body')
    .append('div')
    .append('select')
    .attr('id', 'dropdown-industry')
    .on('change', function (d) {
      var selectedValue = d3.select('#dropdown-industry').property('value')
      var selectedYear = d3.select('#dropdown-year').property('value')
      graph.selectAll('.region').remove()
      map.drawMap(graph, selectedValue, selectedYear, graphSize, mapData, data2019, data2021)
    })

  select
    .selectAll('option')
    .data(names).enter()
    .append('option')
    .text(function (d) { return d })
    .property('selected', function (d) { return d === 'Total' })
}
