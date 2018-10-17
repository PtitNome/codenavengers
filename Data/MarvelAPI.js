/*
 * MarvelAPI: Récupération des informations et photos des personnages
 *            via l'API de Marvel. (https://developer.marvel.com)
 *
 */
import CryptoJS from 'crypto-js';
import { APIKEY, PRVKEY } from './APIKeys'

/*
 * Même chose que getAvengersList(), mais on peut filtré par nom d'Avengers
 * débutant pas la string fournit dans nameStartsWith
 */
export function getAvengersList(offset = 0, nameStartsWith = '') {
//  console.log("**************** getAvengersListNamesStartsWith ****************")
  const TS = Date.now()
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  let params = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  if(nameStartsWith !== '') params += "&nameStartsWith=" + nameStartsWith
  params += "&offset=" + offset
  const URL = 'https://gateway.marvel.com/v1/public/characters' + params
  //console.log("URL=" + URL)

  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => {
      console.log(" %%% getAvengersList() - fetch ERROR: " + error)
      throw error
    })
}

/* Construction de l'url complet de l'image d'un personnage
 * TODO: Fusionner les paramètre thumbnail.path et
 * thumbnail.extension en un seul élément thumbnail */
export function getAvengerImageObsolete( path, extension ) {
  let URI = path + '/landscape_incredible.' + extension
  //console.log('*** getAvengerImage() - URI = ' + URI)
  return URI
}

export function getAvengerImage( thumbnail ) {
  let URI = thumbnail.path + '/landscape_incredible.' + thumbnail.extension
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

/* Obsolete! Test du fonctionnement de la connection à l'API Marvel */
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
