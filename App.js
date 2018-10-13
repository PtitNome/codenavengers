import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { testGetCharactersList, testGetCharacter } from './Data/MarvelAPI';
import AvengerList from './Components/AvengerList';

export default class App extends React.Component {
  constructor() {
    super()

    //testGetCharactersList()
    //testGetCharacter(1010870)

  }

  render() {
    return (
      <AvengerList/>
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
