/*
 * AvengerList: Vue principale, affichage d'une liste de personnages
 * récupérée via l'API Marvel (MarvelAPI.js).
 *
 * (Pour l'instant on ne gère pas la navigation dans la via l'offset
 *  et le chargement à la volée des données... Il faudra à ce moment gérer
 * la donnée 'data.total' de l'API pour détecté la fin de la liste.)
 *
 * TODO: Externaliser le traitement du nameStartsWith et fusionner dans l'API
 * les fonctions getAvengersList() et getAvengersListNamesStartsWith()
 */

import React from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import AvengerElement from './AvengerElement'
import { getAvengersList, getAvengersListNamesStartsWith } from '../Data/MarvelAPI'

class AvengerList extends React.Component {
  /* Affichage d'un sablier pendant le chargement
   * des données via l'API Marvel */
  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

  _loadAvengers() {
    this.setState({ isLoading : true })
    getAvengersList(this.state.offset).then(data => {
      //if(data.data.results.length == 0) créer un élément bidon indiquant qu'aucun personnage n'a été trouvé
      this.setState({
        avengers: data.data.results,
        isLoading: false,
      })
    })
  }

  /* On restreint la liste aux noms d'avengers qui commencent par nameStartsWith */
  _searchBy1stLetters(nameStartsWith) {
    if(!this.state.isLoading) {
      this.setState({ isLoading : true }) //Affichage du sablier
      //Traitement si changement du textinput vers une string vide
      if(nameStartsWith !== "") {
        getAvengersListNamesStartsWith(nameStartsWith, 0).then(data => {
          this.setState({
            avengers: data.data.results,
            isLoading: false
          })
        })
      }
      else {
        getAvengersList(0).then(data => {
          this.setState({
            avengers: data.data.results,
            isLoading: false
          })
        })
      }
    }
  }

  _displayInfoAvenger = (avenger) => {
    /*On passe l'objet avenger aux props la vue AvengerInfo via le PARAMS
      du Navigateur*/
    this.props.navigation.navigate("AvengerInfo", { avenger: avenger})
  }

  constructor(props) {
    super(props)

    this.state = {
      avengers: [],
      isLoading: false,
      offset: 0, //Pour usage ultérieur
    }
  }

  componentDidMount() {
    this._loadAvengers()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Type here the starting letters of a character's name"
          onChangeText={(text) => this._searchBy1stLetters(text)}
        />
        {/* *** TODO ***
         * Ajouter un Button reset pour le TextInput
         */}
        <FlatList
          data={this.state.avengers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <AvengerElement avenger={item}
            displayInfoAvenger={this._displayInfoAvenger}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinput: {
    backgroundColor: 'black',
    color: "white",
    marginTop: 24,
    height: 50,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default AvengerList
