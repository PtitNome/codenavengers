import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { FlatList } from 'react-native';
import avengers from '../Data/tempData'
import AvengerElement from './AvengerElement'
import { getAvengersList, testGetCharacter } from '../Data/MarvelAPI'

class AvengerList extends React.Component {

  _loadAvengers() {
    getAvengersList().then(data => {
      this.setState({ avengers: data.data.results })
    })
  }

  constructor(props) {
    super(props)

    this.state = { avengers: [] }
  }

  componentDidMount() {
    this._loadAvengers()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FlatList
          data={this.state.avengers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <AvengerElement avenger={item}/>}
        />
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
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5
  },
});

export default AvengerList
