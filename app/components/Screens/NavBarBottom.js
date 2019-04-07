import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  StackActions,
  NavigationActions,
  withNavigation
} from 'react-navigation';

class NavBarBottom extends Component {
  render() {
    return (
      <View style={styles.navBottom}>
        <Text style={styles.navBottomText}
          onPress={() => this.props.navigation.navigate('Search')}>Search</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={styles.navBottomText}
          onPress={() => this.props.navigation.navigate('Saved')}>Saved</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={styles.navBottomText}
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

export default withNavigation(NavBarBottom);