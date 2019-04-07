import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchScreen from './components/Screens/SearchScreen';
import SavedScreen from './components/Screens/SavedScreen';
import SettingsScreen from './components/Screens/SettingsScreen';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Search"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Search' })
              ],
            }))
          }}
        />
      </View>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Saved: {
    screen: SavedScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);