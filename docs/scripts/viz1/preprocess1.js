/**
 * @param {Array} data data to extract unique industry names
 * @returns {Array} unique industry names
 */
export function getIndustryNames (data) {
  var uniqueNames = []
  data.forEach((element) => {
    var name = element.nom_industrie
    if (uniqueNames.includes(name) === false) {
      uniqueNames.push(name)
    }
  })
  return uniqueNames
}

/**
 * @param {*} data data to extract specific industry information
 * @param {*} industrySelected industry selected to extract information
 * @returns {*} data by industry
 */
export function getDataByIndustry (data, industrySelected) {
  var dataByIndustry = []
  data.forEach((row) => {
    if (row.nom_industrie === industrySelected) {
      dataByIndustry.push(row)
    }
  })
  return dataByIndustry
}

/**
 * @param {*} _data data to adjust industry name
 * @returns {*} Adjusted industry names
 */
export function adjustIndustryNames (_data) {
  var newData = _data.map((row) => {
    row.nom_industrie = row.nom_industrie.trim()
    return row
  })
  return newData
}

/**
 * @param {*} data2021 2021 data to adjust region name
 * @returns {*} corrected region names of 2021
 */
export function adjustRegions2021 (data2021) {
  const correctedNames = {
    'Ensemble du Québec': 'Ensemble du Québec',
    'Gasp�-�les-de-la-Madeleine': 'Gaspé-îles-de-la-Madeleine',
    'Bas-Saint-Laurent': 'Bas-Saint-Laurent',
    'Capitale-Nationale': 'Capitale-Nationale',
    'Chaudi�re-Appalaches': 'Chaudière-Appalaches',
    Estrie: 'Estrie',
    'Centre-du-Qu�bec': 'Centre-du-Québec',
    'Mont�r�gie': 'Montérégie',
    'Montr�al': 'Montréal',
    Laval: 'Laval',
    'Lanaudi�re': 'Lanaudière',
    Laurentides: 'Laurentides',
    Outaouais: 'Outaouais',
    'Abitibi-T�miscamingue': 'Abitibi-Témiscamingue',
    Mauricie: 'Mauricie',
    'Saguenay-Lac-Saint-Jean': 'Saguenay-Lac-Saint-Jean',
    'C�te-Nord & Nord-du-QC': 'Côte-Nord'
  }
  var correctedRegion = []
  data2021.forEach((row, i) => {
    var nomRegion = row.nom_region
    row.nom_region = correctedNames[nomRegion]
    correctedRegion.push(row)
  })
  var coteNordData = correctedRegion.filter((row) => {
    return row.nom_region === 'Côte-Nord'
  })

  // eslint-disable-next-line no-undef
  var newData = structuredClone(coteNordData)
  newData.map((el) => {
    el.nom_region = 'Nord-du-Québec'
  })

  return correctedRegion.concat(newData)
}
