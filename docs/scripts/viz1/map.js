import * as colorbar from './colorbar.js'
import * as preprocess from './preprocess1.js'
import * as viz1 from './viz1.js'

/**
 * Draws the map base of Quebec province.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {*} graph SVG element to draw on
 */
export function mapBackground (data, path, graph) {
  graph.append('path')
    .datum(data)
    .attr('d', path)
    .attr('stroke', '#000000')
    .attr('stroke-width', '1')
    .attr('class', 'region')
    .attr('id', data.properties.res_nm_reg)
    .style('fill', 'none')
}

/**
 * @param {*} industrySelected Industry selected on the dropdown box
 * @param {*} graph SVG Element of the Plot
 * @param {*} data2019 Data of 2019's dataset
 * @param {*} regions GeoJSON array containing the contours of the map
 * @param {*} regionName Region name to paint on
 * @returns {Array} Index 0 is the value of the region and index 0 is the gradient function
 */
export default function color2018 (industrySelected, graph, data2019, regions, regionName) {
  var dataByIndustry = preprocess.getDataByIndustry(data2019, industrySelected)
  dataByIndustry = dataByIndustry.filter((el) => {
    return regions.features.some((f) => {
      return f.properties.res_nm_reg === el.nom_region
    })
  })
  var dataByRegion = dataByIndustry.filter(el => el.nom_region === regionName)
  var valsEmploy = dataByIndustry.map(function (a) { return parseInt(a.emploi_arrondi_2018) })
  var minValue, maxValue
  var colorValue
  if (valsEmploy.length > 0) {
    colorValue = dataByRegion.pop().emploi_arrondi_2018
    valsEmploy = valsEmploy.map(value => isNaN(value) ? 0 : value)
    minValue = 0
    maxValue = Math.max(...valsEmploy)
  } else {
    colorValue = 0
    minValue = 0
    maxValue = 1
  }
  colorbar.colorBarRangeText(minValue, maxValue, graph)
  var mycolor = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([viz1.colorMin, viz1.colorMax])

  return [colorValue, mycolor]
}

/**
 * @param {*} industrySelected Industry selected on the dropdown box
 * @param {*} graph SVG Element of the Plot
 * @param {*} data2021 Data of 2019's dataset
 * @param {*} regions GeoJSON array containing the contours of the map
 * @param {*} regionName Region name to paint on
 * @returns {Array} Index 0 is the value of the region and index 0 is the gradient function
 */
export function color2020 (industrySelected, graph, data2021, regions, regionName) {
  var dataByIndustry = preprocess.getDataByIndustry(data2021, industrySelected)
  dataByIndustry = dataByIndustry.filter((el) => {
    return regions.features.some((f) => {
      return f.properties.res_nm_reg === el.nom_region
    })
  })
  var dataByRegion = dataByIndustry.filter(el => el.nom_region === regionName)
  var valsEmploy = dataByIndustry.map(function (a) { return parseInt(a.emploi_arrondi_2020) })
  var minValue, maxValue
  var colorValue
  if (valsEmploy.length > 0) {
    colorValue = dataByRegion[0].emploi_arrondi_2020
    valsEmploy = valsEmploy.map(value => isNaN(value) ? 0 : value)
    minValue = 0
    maxValue = Math.max(...valsEmploy)
  } else {
    colorValue = 0
    minValue = 0
    maxValue = 1
  }
  colorbar.colorBarRangeText(minValue, maxValue, graph)
  var mycolor = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([viz1.colorMin, viz1.colorMax])
  return [colorValue, mycolor]
}

/**
 * @param {*} industrySelected Industry selected on the dropdown box
 * @param {*} yearSelected Selected year on the dropdownbox
 * @param {*} element Region object from array
 * @param {*} graph SVG Element of the Plot
 * @param {Array} data2019 Data of 2019's dataset
 * @param {Array} data2021 Data of 2021's dataset
 * @param {*} regions GeoJSON array containing the contours of the map
 */
export function mapColoring (industrySelected, yearSelected, element, graph, data2019, data2021, regions) {
  var regionName = element.properties.res_nm_reg
  var returnValue2018 = color2018(industrySelected, graph, data2019, regions, regionName)
  var returnValue2020 = color2020(industrySelected, graph, data2021, regions, regionName)
  if (parseInt(yearSelected) === 2018) {
    graph.select('#' + regionName)
      .style('fill', returnValue2018[1](returnValue2018[0]))
  } else {
    graph.select('#' + regionName)
      .style('fill', returnValue2020[1](returnValue2020[0]))
  }
}

/**
 * @param {*} industrySelected Industry selected on the dropdown box
 * @param {*} element Region object from array
 * @param {*} graph SVG Element of the Plot
 * @param {Array} data2019 Data of 2019's dataset
 * @param {Array} data2021 Data of 2021's dataset
 * @param {*} regions GeoJSON array containing the contours of the map
 * @param {*} path Contour of a region
 */
export function toolTipVisible (industrySelected, element, graph, data2019, data2021, regions, path) {
  var regionName = element.properties.res_nm_reg
  var returnValue2018 = color2018(industrySelected, graph, data2019, regions, regionName)
  var returnValue2020 = color2020(industrySelected, graph, data2021, regions, regionName)
  var centroid = path.centroid(element.geometry)
  var x = centroid[0]
  var y = centroid[1]
  //   var text = getHtmlTooltip(returnValue2018, returnValue2020, regionName)
  graph.select('#' + regionName)
    .on('mouseover', (d) => {
      var tip = graph.append('rect').attr('id', 'tooltip')
        .attr('width', 300)
        .attr('height', 110)
        .attr('x', x)
        .attr('y', y - 70)
      tip.style('opacity', 0.6)
        .attr('color', '#000000')
      getHtmlTooltip(graph, returnValue2018, returnValue2020, regionName, x + 5, y)
    })
    .on('mouseleave', () => {
      d3.selectAll('#tooltip-text').remove()
      d3.selectAll('#tooltip').remove()
    })
}

/**
 * @param {*} graph SVG Element of the Plot
 * @param {Array} returnValue2018 Indice 0 returns value and indice 1 returns gradient fill function
 * @param {Array} returnValue2020 Indice 0 returns value and indice 1 returns gradient fill function
 * @param {*} regionName Region name to paint on
 * @param {number} x position x to draw tooltip
 * @param {number} y position y to draw tooltip
 */
export function getHtmlTooltip (graph, returnValue2018, returnValue2020, regionName, x, y) {
  var title = 'Information supplémentaire:'
  graph.append('text').attr('id', 'tooltip-text')
    .text(title)
    .attr('fill', 'gold')
    .attr('x', x)
    .attr('y', y - 50)
  var region = 'Nom de Region: ' + regionName
  graph.append('text').attr('id', 'tooltip-text')
    .text(region)
    .attr('fill', '#ffffff')
    .attr('x', x)
    .attr('y', y - 25)
  var nombre1 = 'Emploi arrondi 2018: ' + returnValue2018[0]
  graph.append('text').attr('id', 'tooltip-text')
    .text(nombre1)
    .attr('fill', '#ffffff')
    .attr('x', x)
    .attr('y', y)
  var nombre2 = 'Emploi arrondi 2018: ' + returnValue2020[0]
  graph.append('text').attr('id', 'tooltip-text')
    .text(nombre2)
    .attr('fill', '#ffffff')
    .attr('x', x)
    .attr('y', y + 25)
}

/**
 * @param {*} g SVG element to draw on
 * @param {*} industrySelected Industry selected on dropdown box
 * @param {number} yearSelected Year selected on year dropdown box
 * @param {*} _graphSize Object array with dimentions of graph
 * @param {*} map geoJSON object with regions info of draw
 * @param {Array} data2019 data of 2019
 * @param {Array} data2021 data of 2021
 */
export function drawMap (g, industrySelected, yearSelected, _graphSize, map, data2019, data2021) {
  var projection = d3.geoMercator().scale(950).center([-49.0, 53.6])

  var path = d3.geoPath().projection(projection)

  map.features.forEach(element => {
    mapBackground(element, path, g)
    mapColoring(industrySelected, yearSelected, element, g, data2019, data2021, map)
  })
  map.features.forEach(element => {
    toolTipVisible(industrySelected, element, g, data2019, data2021, map, path)
  })
}
