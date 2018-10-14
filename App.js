import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { testGetCharactersList, testGetCharacter } from './Data/MarvelAPI';
import Navigation from './Navigation/Navigation'

export default class App extends React.Component {

  render() {
    return (
      <Navigation style={ {flex: 1} }/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
