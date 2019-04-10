import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import SearchScreen from './SearchScreen';
import SavedScreen from './SavedScreen';
import SettingsScreen from './SettingsScreen';
import PetInfoModal from './PetInfoModal';
import {fetchSettings} from '../actions/settingsActions';
import {fetchPets} from '../actions/petsActions';

// A navigator to wrap around all possible Pages/Screens of app
const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Saved: SavedScreen,
    Settings: SettingsScreen,
    PetInfo: PetInfoModal
  },
  {
    // Start on SearchScreen
    initialRouteName: 'Search',
    // Use header, even though we close them all manually except the modal
    // this is so the modal will still have a header
    headerMode: 'float'
  }
);

const AppContainer = createAppContainer(AppNavigator);

// A wrapper so that we can set initial state from API json files
class HomeScreen extends Component {
  componentWillMount() {
    // Dispatch parsing of API json files for initial state
    this.props.fetchSettings();
    this.props.fetchPets();
  }

  render() {
    return (<AppContainer />);
  }
}

const mapDispatchToProps = {
  fetchSettings,
  fetchPets
}

export default connect(null, mapDispatchToProps)(HomeScreen);