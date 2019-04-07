import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import SearchScreen from '../SearchScreen';
import SavedScreen from '../SavedScreen';
import SettingsScreen from '../SettingsScreen';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';


const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Saved: SavedScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Search',
  }
);

export default createAppContainer(AppNavigator);