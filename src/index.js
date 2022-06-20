'use strict'

import * as helper from './scripts/helper.js'
import * as viz1 from './scripts/viz1/viz1.js'
import * as viz2 from './scripts/viz2/viz2.js'
import * as viz3 from './scripts/viz3/viz3.js'

/**
 * @file This file is the entry-point for the the code for the project of team 10 for the course INF8808.
 * @author Corentin HUBERT, Vincent BEIGLIG, Paulo Victor QUEIROZ CORREIA
 * @version v1.0.0
 */

(function (d3) {
  const margin = {
    top: 120,
    right: 80,
    bottom: 100,
    left: 80
  }

  let svgSize, graphSize

  setSizing()
  helper.drawButtons(graphSize.width)

  const g = helper.generateG(margin)

  helper.setCanvasSize(svgSize.width, svgSize.height)

  setClickHandler(g)

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing () {
    svgSize = {
      width: 1000,
      height: 600
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }
  }

  /**
   * Sets up the click handler for the buttons.
   *
   * @param {*} g the d3 selection of the graph
   */
  function setClickHandler (g) {
    d3.select('#button1')
      .on('click', () => {
        viz1.build(g)
      })

    d3.select('#button2')
      .on('click', () => {
        viz2.build(g)
      })

    d3.select('#button3')
      .on('click', () => {
        viz3.build(g)
      })
  }
})(d3)
