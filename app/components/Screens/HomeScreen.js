import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Button} from 'react-native';
import SearchScreen from './SearchScreen';
import SavedScreen from './SavedScreen';
import SettingsScreen from './SettingsScreen';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';
import {
  fetchSettings
} from '../../actions/settingsActions';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Saved: SavedScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

class HomeScreen extends Component {
  componentWillMount() {
    this.props.fetchSettings();
  }

  render() {
    return (<AppContainer />);
  }
}

const mapDispatchToProps = {
  fetchSettings
}

export default connect(null, mapDispatchToProps)(HomeScreen);