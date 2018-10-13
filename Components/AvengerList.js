import React from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import avengers from '../Data/tempData'
import AvengerElement from './AvengerElement'
import { getAvengersList, getAvengersListNamesStartsWith } from '../Data/MarvelAPI'

class AvengerList extends React.Component {

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
    getAvengersList(0).then(data => {
      this.setState({
        avengers: data.data.results,
        isLoading: false
      })
    })
  }

  /* On restreint la liste aux noms d'avengers qui commencent par nameStartsWith */
  _searchBy1stLetters(nameStartsWith) {
    if(!this.state.isLoading) {
      console.log("*** AvengerList._searchBy1stLetters() - text = " + nameStartsWith)
      this.setState({ isLoading : true })
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

  constructor(props) {
    super(props)

    this.state = {
      avengers: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this._loadAvengers()
  }

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Type here avenger's names starting letters"
          onChangeText={(text) => this._searchBy1stLetters(text)}
          //onSubmitEditing={(text) => this._loadFilms()}
        />
        {/* *** TODO ***
         * Ajouter un Button reset pour le TextInput
         */}
        <FlatList
          data={this.state.avengers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <AvengerElement avenger={item}/>}
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
    marginTop: 25,
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
