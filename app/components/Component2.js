import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Component2 extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.myView}>
        <Text style={styles.myText}>Hello Brad</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myView: {
    backgroundColor: 'red'
  },
  myText: {
    color: 'orange'
  }
});