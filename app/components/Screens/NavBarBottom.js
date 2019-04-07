import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class NavBarBottom extends Component {
  render() {
    return (
      <View style={styles.navBottom}>
        <Text style={styles.navBottomText}>Search</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={styles.navBottomText}>Saved</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={styles.navBottomText}>Settings</Text>
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