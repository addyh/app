import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import SearchScreen from './SearchScreen';
import SavedScreen from './SavedScreen';
import SettingsScreen from './SettingsScreen';
import PetInfoModal from './PetInfoModal';
import {fetchSettings} from '../../actions/settingsActions';
import {fetchPets} from '../../actions/petsActions';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Saved: SavedScreen,
    Settings: SettingsScreen,
    PetInfo: PetInfoModal
  },
  {
    initialRouteName: 'Search',
  }
);

const AppContainer = createAppContainer(AppNavigator);

class HomeScreen extends Component {
  componentWillMount() {
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