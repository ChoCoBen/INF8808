/**
 *  Uses the projection to convert longitude and latitude to xy coordinates.
 *
 * The keys for the coordinate are written to each feature object in the data.
 *
 * @param {object[]} data The data to be displayed
 * @param {*} projection The projection to use to convert the longitude and latitude
 */
export function convertCoordinates(data, projection) {

    var output = {}
    output.crs = data.crs
    output.type = data.type
    output.features = []
    data.features.forEach(element => {
        var xy = projection(element.geometry.coordinates)
        var x = xy[0]
        var y = xy[1]

        element.x = x
        element.y = y
    })
}


/**
*  Get min value of the current industry for a specific year
*
* @param {object[]} data The data to be displayed
* @returns {int} projection The projection to use to convert the longitude and latitude
*/
export function getMin(data,) {
    var min = data[0].emploi_arrondi_2018
    data.forEach(element => {
        if (element.emploi_arrondi_2018 < min) {
            min = element.emploi_arrondi_2018
        }
    });
    return min
}

/**
*  Get max value of the current industry for a specific year
*
* @param {object[]} data The data to be displayed
* @returns {int} projection The projection to use to convert the longitude and latitude
*/
export function getMax(data,) {
    var max = data[0].emploi_arrondi_2018
    data.forEach(element => {
        if (element.emploi_arrondi_2018 > max) {
            max = element.emploi_arrondi_2018
        }
    });
    return max
}

export function getIndustryNames(data) {
    var uniqueNames = []
    data.forEach((element) => {
        var name = element.nom_industrie
        if (uniqueNames.includes(name) === false) {
            uniqueNames.push(name)
        }
    })
    return uniqueNames

}

export function getDataByIndustry(data, industrySelected) {
    var dataByIndustry = []
    data.forEach((row) => {
        if (row.nom_industrie === industrySelected) {
            dataByIndustry.push(row)
        }
    })
    return dataByIndustry
}