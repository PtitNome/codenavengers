/*
 * MarvelAPI: Récupération des informations et photos des personnages
 *            via l'API de Marvel. (https://developer.marvel.com)
 *
 * TODO: Fusionner getAvengersList() et getAvengersListNamesStartsWith() et
 *       passera une str vide ("") lorsque l'on ne fait pas de recherche
 */
import CryptoJS from 'crypto-js';
import { APIKEY, PRVKEY } from './APIKeys'

/*
 * Récupère un tableau de personnages avengers par lots (&limit=50).
 * offset: Déplacement dans la liste complète de l'APIKEY
 */
export function getAvengersList (offset) {
//  console.log("**************** getAvengersList ****************")
  const TS = Date.now()
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  let params = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  /* En attendant d'implémenter un chargement des données à la volée
     en suivant le scroll du flatlist, on va charger les premiers 50 éléments*/
  params += '&offset=' + offset + '&limit=50'
  const URL = 'https://gateway.marvel.com/v1/public/characters' + params

  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.log(" %%% getAvengersList() - fetch ERROR: " + error))
}

/*
 * Même chose que getAvengersList(), mais on peut filtré par nom d'Avengers
 * débutant pas la string fournit dans nameStartsWith
 */
export function getAvengersListNamesStartsWith (nameStartsWith, offset) {
//  console.log("**************** getAvengersListNamesStartsWith ****************")
  const TS = Date.now()
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  let params = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  params += "&nameStartsWith=" + nameStartsWith + "&offset=" + offset
  const URL = 'https://gateway.marvel.com/v1/public/characters' + params

  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => {
      console.log(" %%% getAvengersListNamesStartsWith() - fetch ERROR: " + error)
      throw error
    })
}

/* Construction de l'url complet de l'image d'un personnage
 * TODO: Fusionner les paramètre thumbnail.path et
 * thumbnail.extension en un seul élément thumbnail */
export function getAvengerImage( path, extension ) {
  let URI = path + '/landscape_incredible.' + extension
  //console.log('*** getAvengerImage() - URI = ' + URI)
  return URI
}

/* Obsolete! Test du fonctionnement de la connection à l'API Marvel */
export function testGetCharactersList () {
  console.log("*********************************************")
  const TS = Date.now()
  console.log("TS=" + TS)
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  console.log("HASH=" + HASH)
  const PARAMS = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  const URL = 'https://gateway.marvel.com/v1/public/characters' + PARAMS
  console.log("URL=" + URL)

  console.log("*********************************************")
  fetch(URL)
    .then((response) => response.text()).then((data) => console.log(data))
    .catch((error) => console.error(error))
}


export function testGetCharacter( characterID ) {
  console.log("*********************************************")
  const TS = Date.now()
  console.log("TS=" + TS)
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  console.log("HASH=" + HASH)
  const PARAMS = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  const URL = 'http://gateway.marvel.com/v1/public/characters/' + characterID + PARAMS
  console.log("URL=" + URL)

  console.log("*********************************************")
  fetch(URL)
    .then((response) => response.text()).then((data) => console.log(data))
    .catch((error) => console.error(error))

  //console.log(json)
}
