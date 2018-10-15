/*
 * AvengerList: Vue principale, affichage d'une liste de personnages
 * récupérée via l'API Marvel (MarvelAPI.js).
 *
 * (Pour l'instant on ne gère pas la navigation dans la liste via l'offset
 *  et le chargement à la volée des données... Il faudra à ce moment gérer
 * la donnée 'data.total' de l'API pour détecté la fin de la liste.)
 *
 * TODO: Externaliser le traitement du nameStartsWith et fusionner dans l'API
 * les fonctions getAvengersList() et getAvengersListNamesStartsWith()
 */

import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { Keyboard } from 'react-native';
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

  _loadAvengers(nameStartsWith = "") {
    this.setState({ isLoading : true })
    getAvengersList(nameStartsWith).then(data => {
      /* Workaround temporaire qui supprime 3-D Man
         qui gâche un peut la première impression par les couleurs
         de son image. */
      data.data.results.splice(0, 1)
      //if(data.data.results.length == 0) créer un élément bidon indiquant qu'aucun personnage n'a été trouvé
      this.setState({
        avengers: data.data.results,
        isLoading: false,
      })
    })
  }

  /* Pour vider le TextInput de recherche et réinitialiser la liste */
  _clearInput = () => {
    this._textInput.setNativeProps({text: ''})
    this._loadAvengers()
    this._scrollToTop()
  }

  _scrollToTop = () => {
    this._flatList.scrollToIndex({ animated: false, index: 0, viewOffset: 0, viewPosition: 0 })
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
        <Image
          style={styles.banner}
          source={require('../Images/avengers_banner.png')}
        />
        <View style={styles.input}>
          <TextInput
            ref={component => this._textInput = component}
            style={styles.textinput}
            placeholder="Type here the starting letters of a character's name"
            onChangeText={(text) => {
                this._loadAvengers(text)
                this._scrollToTop()
              }
            }
          />
          <Button style={styles.button}
            title='Reset'
            color='gray'
            onPress={this._clearInput}
          />
        </View>
        {/* *** TODO ***
         * Ajouter un Button reset pour le TextInput
         */}
        <FlatList style={styles.list}
          ref={component => this._flatList = component}
          data={this.state.avengers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <AvengerElement avenger={item}
            displayInfoAvenger={this._displayInfoAvenger}/>}
          //refreshing={this.state.isLoading}
          //onRefresh={() => this._scrollToTop}
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
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  banner: {
    alignSelf: 'center',
    height: 150,
    marginTop: 24,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
    height: 50,
    backgroundColor: 'black',
    padding: 5,
  },
  textinput: {
    flex: 1,
    backgroundColor: 'black',
    color: "white",
    //marginTop: 24,
    height: 50,
    paddingLeft: 5,
  },
  button: {
    flex: 1,
    height: 50,
  },
  list: {
    backgroundColor: 'black',
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
