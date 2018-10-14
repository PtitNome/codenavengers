// Components/AvengerInfo.js

import React from 'react';
import { StyleSheet, View, ScrollView, Image, ActivityIndicator, Text } from 'react-native'
import { getAvengerImage } from '../Data/MarvelAPI'

class AvengerInfo extends React.Component {

  constructor(props) {
    super(props)
    //console.log("avenger.name = " + this.props.navigation.state.params.avenger.name)
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.view_container}>
          <Image
            style={styles.avg_img}
            source={
              getAvengerImage(this.props.navigation.state.params.avenger.thumbnail.path,
                this.props.navigation.state.params.avenger.thumbnail.extension).includes('image_not_available')?
              require('../Images/image_not_available.png')
              : {uri: getAvengerImage(this.props.navigation.state.params.avenger.thumbnail.path,
                this.props.navigation.state.params.avenger.thumbnail.extension)} }
          />
        </View>
        <ScrollView style={styles.scrollview_container}>
          <Text style={styles.text_name}>Name : {this.props.navigation.state.params.avenger.name}</Text>
          <Text style={styles.default_text}>Real identity : Lorem Ipsum</Text>
          <Text style={styles.default_text}>Age : 38</Text>
          <Text style={styles.description_text}>Description : {this.props.navigation.state.params.avenger.description}</Text>
          <Text style={styles.description_text}>Super power : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis eget quam sed ultricies. Vestibulum nec augue nunc. Proin eget aliquet tortor. Nunc at lectus eu elit sollicitudin feugiat eu non mi. Vivamus molestie nulla quis sapien malesuada, ut aliquet ante interdum. Phasellus id commodo metus, in finibus elit. Donec fringilla turpis eget ornare commodo. Donec malesuada tortor libero, ultrices pharetra velit euismod ac.       Vestibulum scelerisque tincidunt risus non consectetur. Cras lobortis ut dui auctor porttitor. Maecenas vitae sem nec velit porttitor pulvinar pretium nec risus. Proin eu erat tellus. Praesent varius neque vel aliquam egestas. In hac habitasse platea dictumst. Vestibulum elementum leo ac sem aliquet accumsan.
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  view_container: {
    height: 220,
  },
  scrollview_container: {
    flex: 2,
    backgroundColor: 'black',
  },
  avg_img: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  text_name: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    color: 'snow',
    //textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: 'snow',
    margin: 10,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 10,
    marginRight: 5,
    marginTop: 5,
    color: 'snow',
  }

  /*loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },*/
})

export default AvengerInfo
