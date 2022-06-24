/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
        + A title stating the hovered element's group, with:
          - Font family: Grenze Gotish
          - Font size: 24px
          - Font weigth: normal
        + A bold label for the player name followed
          by the hovered elements's player's name
        + A bold label for the player's line count
          followed by the number of lines
    */
  //   var title = "<span id='tooltip-title'>Act" + d.Act + '</span>'
  var c = parseInt(d[1]) - parseInt(d[0])
  //   var player = "<div class='tooltip-value'><b>Player : </b>" + d.Player + '</div>'
  var count = "<div class='tooltip-value'><b>Nombre d'emplois : </b>" + c + '</div>'

  return '<span>' + count + '</span>'
}
