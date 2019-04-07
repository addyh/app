import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavBarBottom from '../NavBarBottom';

class SavedScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            <Text>saved screen</Text>
          </View>
          <View style={[styles.box2, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const boxBgColor = 'steelblue';
const boxMargin = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  box: {
    backgroundColor: boxBgColor,
    margin: boxMargin,
  },
  box1: {
    flex: 13,
  },
  box2: {
    flex: 1,
  },
});

export default SavedScreen;