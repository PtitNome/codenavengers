// Data/MarvelAPI.js
import CryptoJS from 'crypto-js';
import { APIKEY, PRVKEY } from './ApiKeys'


export function getAvengersList () {
//  console.log("**************** getAvengersList ****************")
  const TS = Date.now()
  const HASH = CryptoJS.MD5(TS + PRVKEY + APIKEY).toString(CryptoJS.enc.Hex)
  const PARAMS = '?ts=' + TS + '&apikey=' + APIKEY + '&hash=' + HASH
  const URL = 'https://gateway.marvel.com/v1/public/characters' + PARAMS

  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getAvengerImage( path, extension ) {
  let URI = path + '/landscape_incredible.' + extension
  console.log('*** getAvengerImage() - URI = ' + URI)
  return URI
}

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
