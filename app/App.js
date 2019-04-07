import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import HomeScreen from './components/Screens/HomeScreen';
import SearchScreen from './components/Screens/SearchScreen';
import SavedScreen from './components/Screens/SavedScreen';
import SettingsScreen from './components/Screens/SettingsScreen';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  }
}