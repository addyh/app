import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground} from 'react-native';
import NavBarBottom from './NavBarBottom';

// Row data (hard-coded)
const rows = [
  {id: 0, text: 'Fido, 3yr, M'},
  {id: 1, text: 'Spot, 2yr, M'},
  {id: 2, text: 'Fluffy, 2yr, F'},
  {id: 3, text: 'Bear, 3yr, M'},
]

class SavedScreen extends Component {
  state = {
    dataSource: rows
  }

  onPress(rowData) {
    console.log(rowData)
  }

  renderRow = (rowData) => {
    let petUri = 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg';
    return (
      <TouchableOpacity onPress={() => this.onPress(rowData)}>
        <View style={styles.row}>
          <View style={styles.petImage}>
          <ImageBackground source={{uri: petUri}} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{rowData.text}</Text>
            <Text numberOfLines={2} textBreakStrategy='simple' style={styles.petDescription}>A description that is really long blasdbo whtoewho ifhioewhf ioft is really long blasdbo whtoewho ifhioewhf ioft is really long blasdbo whtoewho ifhioewhf iofhewfio hewio fbuoewb </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            <FlatList
              style={styles.savedList}
              data={[{key: 'a'}, {key: 'b'}]}
              renderItem={this.renderRow}
            />
          </View>
          <View style={[styles.box2, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const boxBgColor = '#4682b4';
const boxMargin = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 36 : 0,
    backgroundColor: boxBgColor,
  },
  layout: {
    flex: 1,
    backgroundColor: boxBgColor,
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
  savedList: {

  },
  row: {
    padding: 5,
    margin: 5,
    backgroundColor: '#6096c8',
    flexDirection: 'row',
  },
  petImage: {
    width: 100,
    height: 100,
  },
  petDetails: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
    height: 100,
  },
  petName: {
    fontSize: 28,
  },
  petDescription: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    flex: 1,
  },
});

export default SavedScreen;