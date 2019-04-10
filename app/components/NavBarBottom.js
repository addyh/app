import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import * as colors from '../styles/colors';

// Navigation link component at bottom of every Screen on the app
class NavBarBottom extends Component {
  constructor(props) {
    super(props);
    this.highlightIfOnScreen = this.highlightIfOnScreen.bind(this);
  }

  // Return a dark backgroundColor if the navigation property is the current screen
  highlightIfOnScreen (screen) {
    let currentScreen = this.props.navigation.state.routeName;
    if (currentScreen==screen) {
      return {
        backgroundColor: colors.boxDarker
      };
    }
  }

  // Render the 3 app navigation links, highlighting current screen
  render() {
    return (
      <View style={styles.navBottom}>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Search')]}
          onPress={() => this.props.navigation.navigate('Search')}>Search</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Saved')]}
          onPress={() => this.props.navigation.navigate('Saved')}>Saved</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Settings')]}
          onPress={() => this.props.navigation.navigate('Settings')}>Settings</Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  navBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  navBottomText: {
    fontSize: 32,
  },
});

// Get access to navigation prop
export default withNavigation(NavBarBottom);