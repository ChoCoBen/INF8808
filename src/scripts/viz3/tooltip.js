/**
 * Defines the contents of the tooltip. See CSS for tooltip styling.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  return 'bla'
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  d3.selectAll('circle')
    .on('mouseover', function (d) {
      d3.select(this).style('opacity', 1)
      tip.show(d, this)
    })
    .on('mouseout', function () {
      tip.hide()
    })
}
