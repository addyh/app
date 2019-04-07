import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Component1 extends Component {
  constructor() {
    super();
    this.state = {
      name: 'thename',
      showName: true
    };
  }
  
  static defaultProps = {
    message: 'Hello'
  };
  render() {
    let name = this.state.showName ? this.state.name : 'no name';
    console.log(this.state.showName);
    return (
      <View>
        <Text>{this.props.message}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}