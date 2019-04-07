import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as types from '../actions/types';
import {increaseCounter, decreaseCounter} from '../actions/counterActions';

class CounterApp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', width:200, justifyContent:'space-around'}}>
        <TouchableOpacity onPress={() =>this.props.inc()}>
            <Text>Increase</Text>
          </TouchableOpacity>

          <Text style={{fontSize:20}}>{this.props.count}</Text>

          <TouchableOpacity onPress={() =>this.props.dec()}>
            <Text>Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    count: state.counter.count
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     increaseCounter: () => dispatch({type:types.INCREASE}),
//     decreaseCounter: () => dispatch({type:types.DECREASE}),
//   }
// }

const mapDispatchToProps = {
  inc: increaseCounter, dec: decreaseCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);