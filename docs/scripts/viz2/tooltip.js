/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  var c = parseInt(d[1]) - parseInt(d[0])
  var count = "<div class='tooltip-value'><b>Nombre d'emplois : </b>" + c + '</div>'

  return '<span>' + count + '</span>'
}
