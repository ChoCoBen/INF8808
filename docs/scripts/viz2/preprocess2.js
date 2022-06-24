import { stack } from 'd3'

/**
 * Removes all data that do not concern the whole of Quebec
 *
 * @param {Array} data the data to filter
 * @returns {Array} the data filtered
 */
export function filterRegion (data) {
  data = data.filter(element => (element.nom_region === 'Ensemble du Québec'))
  return data
}

/**
 * Gets the list of the differents industries
 *
 * @param data2019
 * @param data2021
 * @returns {Array} The array containing the names of the industries
 */
export function getIndustries (data2019, data2021) {
  const industries = {}
  const industries2019 = { year: '2019' }
  const industries2021 = { year: '2021' }
  const industries2023 = { year: '2023' }
  const industries2025 = { year: '2025' }
  const stack = []

  data2019.forEach((element) => {
    // console.log(1 + (element.Taux_de_croissance_annuel_moyen_2019_2023 / 100))
    industries2019[element.nom_industrie.replace(/\s+/g, ' ').trim()] = element.emploi_arrondi_2018
    industries2023[element.nom_industrie.replace(/\s+/g, ' ').trim()] = String(Math.round((element.emploi_arrondi_2018 * (1 + (element.Taux_de_croissance_annuel_moyen_2019_2023 / 100)))))
  })
  data2021.forEach((element) => {
    industries2021[element.nom_industrie.replace(/\s+/g, ' ').trim()] = element.emploi_arrondi_2020
    industries2025[element.nom_industrie.replace(/\s+/g, ' ').trim()] = String(Math.round((element.emploi_arrondi_2020 * (1 + (element.Taux_de_croissance_annuel_moyen_2021_2025 / 100)))))
  })
  stack.push(industries2019)
  stack.push(industries2021)
  stack.push(industries2023)
  stack.push(industries2025)
  industries['2019'] = industries2019
  industries['2021'] = industries2021
  industries['2023'] = industries2023
  industries['2025'] = industries2025
  const industries2019_2 = { year: '2019' }
  const industries2021_2 = { year: '2021' }
  const industries2023_2 = { year: '2023' }
  const industries2025_2 = { year: '2025' }

  const exploitation_de_ressources = ['Agriculture/ pêche et chasse',
    'Foresterie et Exploitation forestière',
    'Extraction minière',
    'Construction',
    'Pétrole/ charbon et produits chimiques']

  const industries_lourdes = ['Produits en plastique et en caoutchouc',
    'Produits en bois',
    'Produits minéraux non métalliques',
    'Première transformation des métaux',
    'Produits métalliques',
    'Machines',
    'Produits informatiques/ électroniques et électriques',
    'Produits aérospatiaux et leurs pièces',
    'Activités diverses de fabrication',
    'Autres matériel de transport',
    'Textiles et produits textiles et Vêtements et produits en cuir',
    'Papier',
    'Meubles et produits connexes'
  ]
  const commerce = [
    'Commerce de gros',
    'Commerce de détail',
    'Transport et entreposage',
    'Impression et activités connexes de soutien',
    'Commerce',
    'Fabrication',
    'Aliments/ boissons et tabac'
  ]
  const technologie_finance = [
    'Finances',
    "Sociétés d'assurance et activités connexes",
    'Services immobiliers et services de location et de location à bail',
    'Services juridiques et de comptabilité',
    'Architecture/ génie et services connexes et services spécialisés de design',
    'Conception de systèmes informatiques et services connexes',
    'Services de conseils en gestion et de conseils scientifiques et techniques ET Services de recherche et de développement scientifiques',
    'Publicité/ relations publiques et services connexes ET Autres services professionnels/ scientifiques et techniques',
    "Gestion de sociétés et d'entreprises ET Services administratifs/ de soutien et autres"
  ]

  const culture = [
    "Industrie de l'information et industrie culturelle",
    'Arts/ spectacles et loisirs'
  ]

  const services_publiques = [
    'Soins de santé',
    'Assistance sociale',
    'Hébergement et restauration',
    'Autres services (sauf les administrations publiques)',
    'Administrations publiques',
    "Services d'enseignement",
    'Services publics'
  ]
  industries2019_2.Commerce = 0
  industries2021_2.Commerce = 0
  industries2023_2.Commerce = 0
  industries2025_2.Commerce = 0

  industries2019_2['Service publique'] = 0
  industries2021_2['Service publique'] = 0
  industries2023_2['Service publique'] = 0
  industries2025_2['Service publique'] = 0

  industries2019_2['Technologies et finance'] = 0
  industries2021_2['Technologies et finance'] = 0
  industries2023_2['Technologies et finance'] = 0
  industries2025_2['Technologies et finance'] = 0

  industries2019_2['exploitation de ressources'] = 0
  industries2021_2['exploitation de ressources'] = 0
  industries2023_2['exploitation de ressources'] = 0
  industries2025_2['exploitation de ressources'] = 0

  industries2019_2.Industries = 0
  industries2021_2.Industries = 0
  industries2023_2.Industries = 0
  industries2025_2.Industries = 0

  industries2019_2.Culture = 0
  industries2021_2.Culture = 0
  industries2023_2.Culture = 0
  industries2025_2.Culture = 0

  Object.keys(industries2019).slice(2).forEach((element) => {
    if (exploitation_de_ressources.includes(element)) {
      industries2019_2['exploitation de ressources'] += parseInt(industries2019[element])
      industries2021_2['exploitation de ressources'] += parseInt(industries2021[element])
      industries2023_2['exploitation de ressources'] += parseInt(industries2023[element])
      industries2025_2['exploitation de ressources'] += parseInt(industries2025[element])
    }
    if (services_publiques.includes(element)) {
      industries2019_2['Service publique'] += parseInt(industries2019[element])
      industries2021_2['Service publique'] += parseInt(industries2021[element])
      industries2023_2['Service publique'] += parseInt(industries2023[element])
      industries2025_2['Service publique'] += parseInt(industries2025[element])
    }
    if (industries_lourdes.includes(element)) {
      industries2019_2.Industries += parseInt(industries2019[element])
      industries2021_2.Industries += parseInt(industries2021[element])
      industries2023_2.Industries += parseInt(industries2023[element])
      industries2025_2.Industries += parseInt(industries2025[element])
    }
    if (commerce.includes(element)) {
      industries2019_2.Commerce += parseInt(industries2019[element])
      industries2021_2.Commerce += parseInt(industries2021[element])
      industries2023_2.Commerce += parseInt(industries2023[element])
      industries2025_2.Commerce += parseInt(industries2025[element])
    }
    if (technologie_finance.includes(element)) {
      industries2019_2['Technologies et finance'] += parseInt(industries2019[element])
      industries2021_2['Technologies et finance'] += parseInt(industries2021[element])
      industries2023_2['Technologies et finance'] += parseInt(industries2023[element])
      industries2025_2['Technologies et finance'] += parseInt(industries2025[element])
    }
    if (culture.includes(element)) {
      industries2019_2.Culture += parseInt(industries2019[element])
      industries2021_2.Culture += parseInt(industries2021[element])
      industries2023_2.Culture += parseInt(industries2023[element])
      industries2025_2.Culture += parseInt(industries2025[element])
    }
  })
  const newStack = []
  newStack.push(industries2019_2)
  newStack.push(industries2021_2)
  newStack.push(industries2023_2)
  newStack.push(industries2025_2)
  return newStack
}
