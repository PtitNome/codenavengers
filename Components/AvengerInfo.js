// Components/AvengerInfo.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

class AvengerInfo extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Infos pour l'Avenger avec l'id {this.props.navigation.state.params.idAvenger}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default AvengerInfo
