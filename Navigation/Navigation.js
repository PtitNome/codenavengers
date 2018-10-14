// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation'
import AvengerList from '../Components/AvengerList'
import AvengerInfo from '../Components/AvengerInfo'

const SearchStackNavigator = createStackNavigator({

  Avengers: {
    screen: AvengerList,
    navigationOptions: {
      //title: 'Avengers'
      header: null,
    }
  },
  AvengerInfo: {
    screen: AvengerInfo,
    navigationOptions: {
      title: 'Profile',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'snow',
    }
  }

})

export default SearchStackNavigator
