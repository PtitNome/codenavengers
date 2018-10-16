/*
 * App: Point d'entrée de l'application, chargement d'un Navigateur
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    console.log("***************************************************")
    console.log("-----------------BEGIN EXECUTION-------------------")
    console.log("***************************************************")
  }
  render() {
    return (
      <Navigation style={ {flex: 1} }/>
    );
  }
}

const styles = StyleSheet.create({
});
