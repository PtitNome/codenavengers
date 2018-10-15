/*
 * AvengerElement: Component custom d'affichage de la photo
 * du personnage avec son nom en overlay pour affichage dans le
 * FlatList de AvengerList.
 */

import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity, ImageBackground } from 'react-native';
import { getAvengerImage } from '../Data/MarvelAPI'

class AvengerElement extends React.Component {
  constructor(props) {
    super(props)
    //console.log("*** avenger.name = " + props.avenger.name)
  }

  render() {
    const { avenger, displayInfoAvenger } = this.props
    return(
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayInfoAvenger(avenger)}>

        <ImageBackground
          style={styles.avg_img}
          source={
            getAvengerImage(avenger.thumbnail).includes('image_not_available')?
            require('../Images/image_not_available.png')
            : {uri: getAvengerImage(avenger.thumbnail)} }
          >
          <Text style={styles.name_text}>{avenger.name}</Text>
        </ImageBackground>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 200,
  },
  avg_img: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  name_text: {
    flexWrap: 'wrap',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'snow',
    textShadowColor: 'slategrey',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingTop: 25,
    paddingLeft: 25,
  },
});

export default AvengerElement
