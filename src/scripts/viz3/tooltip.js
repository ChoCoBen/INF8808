/**
 * Defines the contents of the tooltip. See CSS for tooltip styling.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  var title = "<span class='titleTooltip'><b>Information supplémentaire</b></span><br><br>"
  var nombre = "<span>Nombre d'emploi: " + d.emploi_estimé + '</span><br>'
  var pourcentage = '<span>Pourcentage: ' + d.pourcentage.toFixed(2) + '</span><br>'
  var deficit = '<span>Prévision de déficit: ' + d.déficit + '</span>'
  return title + nombre + pourcentage + deficit
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  d3.selectAll('circle')
    .on('mouseover', function (d) {
      tip.show(d, this)
    })
    .on('mouseout', function () {
      tip.hide()
    })
}
