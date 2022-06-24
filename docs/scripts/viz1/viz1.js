import * as preprocess from './preprocess1'

// const colorMin = '#f70d1a'
const colorMin = '#ffffff'
const colorMax = '#f70d1a'

/**
 * Build the third vizualisation
 *
 * @param {*} g the d3 selection of the graph
 * @param {*} graphSize an object containing the size of the graph and margins
 */
export function build (g, graphSize) {
  g.selectAll('*').remove()
  var gradient = createColorGradient(g)

  createSelectionBox(g)
  drawColorBar(g)
  var industry = 'Total'
  drawMap(g, industry)
}

/**
 * @param graph
 */
export function createSelectionBox (graph) {
  d3.csv('./par_industrie_2019.csv').then(function (data) {
    var names = preprocess.getIndustryNames(data)

    var labels_posX = 500
    var labels_posY = 50

    graph.append('text')
      .text('Industrie sélectionnée:')
      .attr('x', labels_posX)
      .attr('y', labels_posY - 5)

    var select = graph.append('foreignObject')
      .attr('width', 300)
      .attr('height', 19)
      .attr('x', labels_posX)
      .attr('y', labels_posY)
      .append('xhtml:body')
      .append('div')
      .append('select')
      .attr('id', 'dropdown')
      .on('change', function (d) {
        var selectedValue = d3.select('#dropdown').property('value')
        graph.selectAll('.region').remove()
        drawMap(graph, selectedValue)
      })

    var options = select
      .selectAll('option')
      .data(names).enter()
      .append('option')
      .text(function (d) { return d })
      .property('selected', function (d) { return d === names[0] })
  })
}

/**
 * @param graph
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
    .attr('stop-color', colorMax)
    .attr('stop-opacity', 1)
  gradient.append('stop')
    .attr('class', 'end')
    .attr('offset', '100%')
    .attr('stop-color', colorMin)
    .attr('stop-opacity', 1)
}

/**
 * @param graph
 */
export function drawColorBar (graph) {
  graph.append('rect')
    .attr('x', 400)
    .attr('y', 0)
    .attr('height', 450)
    .attr('width', 25)
    .attr('fill', 'url(#svgGradient)')
}

/**
 * @param minValue
 * @param maxValue
 * @param graph
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

/**
 * Draws the map base of Quebec province.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 * @param graph
 * @param industrySelected
 * @param regions
 */
export function mapBackground (data, path, graph, industrySelected, regions) {
  var minValue, maxValue, dataByIndustry
  d3.csv('./par_industrie_2019.csv').then(function (dataframe) {
    dataByIndustry = preprocess.getDataByIndustry(dataframe, industrySelected)
    var dataframeFiltered = dataByIndustry.filter((el) => {
      return regions.features.some((f) => {
        return f.properties.res_nm_reg === el.nom_region
      })
    })

    var valsEmploy = dataframeFiltered.map(function (a) { return parseInt(a.emploi_arrondi_2018) })

    if (valsEmploy.length > 0) {
      valsEmploy = valsEmploy.map(value => isNaN(value) ? 0 : value)
      minValue = Math.min(...valsEmploy)
      maxValue = Math.max(...valsEmploy)
    } else {
      minValue = 0
      maxValue = 1
    }

    colorBarRangeText(minValue, maxValue, graph)

    var mycolor = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([colorMin, colorMax])
    graph.append('path')
      .datum(data)
      .attr('d', path)
      .style('fill', function (d) {
        var province = d.properties.res_nm_reg
        var value = 0
        dataframeFiltered.forEach((element) => {
          if ((element.nom_region === province)) {
            value = element.emploi_arrondi_2018
            console.log(element.nom_region, value)
          }
        })
        return mycolor(value)
      })
      .attr('stroke', '#000000')
      .attr('stroke-width', '1')
      .attr('class', 'region')
      .on('mouseover', (d) => {
        showMapLabel(d, path, graph)
      })
      .on('mouseleave', () => {
        d3.selectAll('#map-label').remove()
      })
  })
}

/**
 * @param d
 * @param path
 * @param graph
 */
export function showMapLabel (d, path, graph) {
  // Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  var centroid = path.centroid(d.geometry)
  var text = d.properties.res_nm_reg
  var x = centroid[0]
  var y = centroid[1]
  graph.append('text')
    .text(text)
    .attr('x', x - 20)
    .attr('y', y + 5)
    .attr('id', 'map-label')
    .attr('font-size', 12)
    .attr('fill', '#000000')
}

/**
 * @param g
 * @param industrySelected
 */
export function drawMap (g, industrySelected) {
  var element = g.node().getBBox().width
  var height = d3.select('svg').attr('height')
  var width = d3.select('svg').attr('width')
  var scale = 1000

  var color = d3.scaleOrdinal(d3.schemeCategory10)

  var projection = d3.geoMercator().scale(950).center([-49.0, 53.6])

  var path = d3.geoPath().projection(projection)

  d3.json('./quebec_regions.geojson').then(function (data) {
    data.features.forEach(element => {
      mapBackground(element, path, g, industrySelected, data)
    })
  })
}
