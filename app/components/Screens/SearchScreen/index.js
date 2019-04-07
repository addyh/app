import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavBarBottom from '../NavBarBottom';

export default class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            <Text>Hello</Text>
          </View>
          <View style={[styles.box2, styles.box]}>
            <Text>Hello</Text>
          </View>
          <View style={[styles.box3, styles.box]}>
            <Text>Hello</Text>
          </View>
          <View style={[styles.box4, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const cardBgColor = 'steelblue';
const cardMargin = 5;

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
    backgroundColor: cardBgColor,
    margin: cardMargin,
  },
  box1: {
    flex: 4,
  },
  box2: {
    flex: 1,
  },
  box3: {
    flex: 3,
  },
  box4: {
    flex: 1,
  },
});