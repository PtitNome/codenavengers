/*
 * AvengerList: Vue principale, affichage d'une liste de personnages
 * récupérée via l'API Marvel (MarvelAPI.js).
 *
 * (Pour l'instant on ne gère pas la navigation dans la liste via l'offset
 *  et le chargement à la volée des données... Il faudra à ce moment gérer
 * la donnée 'data.total' de l'API pour détecté la fin de la liste.)
 *
 */

import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { Keyboard } from 'react-native';
import AvengerElement from './AvengerElement';
import { getAvengersList, getAvengersListNamesStartsWith } from '../Data/MarvelAPI';

class AvengerList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      avengers: [],
      offset: 0,
      nameStartsWith: '',
      isLoading: false,
      isRefreshing: false,
    }
  }

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

  _loadAvengers = () => {
    this.setState({ isLoading : true })

    getAvengersList(this.state.offset, this.state.nameStartsWith).then(data => {
      /* Workaround temporaire qui supprime 3-D Man
         qui gâche un peu la première impression par les couleurs
         de son image. */
      data.data.results.splice(0, 1)

      this.setState({
        avengers: this.state.offset === 0 ? data.data.results : [...this.state.avengers, ...data.data.results],
        //offset: data.data.offset, //+20?
        isRefreshing: false,
        isLoading: false,
      })
    })
    console.log("_loadAvengers() - this.state.offset=" + this.state.offset)
  }

  _refresh = () => {
    this.setState({
        isRefreshing: true,
      }, () => { this._loadAvengers() }
    )
  }

  _loadMore = () => {
    console.log("_loadMore()")
    this.setState({
        offset: this.state.offset+20
      },
      () => {
        this._loadAvengers()
      }
    )
  }

  /* Pour vider le TextInput de recherche et réinitialiser la liste */
  _clearInput = () => {
    this._textInput.setNativeProps({text: ''})
    this.setState({
      avengers: [],
      offset: 0,
      nameStartsWith: ''
    },
    () => {
      this._loadAvengers()
    })
    this._scrollToTop()
  }

  _scrollToTop = () => {
    /* On scrollToTop seulement lorsque la liste n'est pas vide */
    if(this.state.avengers.length > 0) {
      this._flatList.scrollToIndex({ animated: false, index: 0, viewOffset: 0, viewPosition: 0 })
    }
  }

  _displayInfoAvenger = (avenger) => {
    /*On passe l'objet avenger aux props la vue AvengerInfo via le PARAMS
      du Navigateur*/
    this.props.navigation.navigate("AvengerInfo", { avenger: avenger})
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
                this.setState({
                    avengers: [],
                    offset: 0,
                    nameStartsWith: text
                  },
                  () => {
                    this._loadAvengers()
                  }
                )
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

        <FlatList style={styles.list}
          ref={component => this._flatList = component}
          data={this.state.avengers}
          renderItem={({item}) => <AvengerElement avenger={item}
            displayInfoAvenger={this._displayInfoAvenger}/>}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={this._refresh}
          refreshing={this.state.isRefreshing}
          onEndReached={ this._loadMore }
          onEndReachedThreshold={5}
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
