import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity, ImageBackground } from 'react-native';
import { getAvengerImage } from '../Data/MarvelAPI'

class AvengerElement extends React.Component {
  render() {
    const avenger = this.props.avenger
    return(
      <TouchableOpacity style={styles.main_container}>
        <ImageBackground
          style={styles.avg_img}
          source={ {uri: getAvengerImage(avenger.thumbnail.path, avenger.thumbnail.extension)}
        }>
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
