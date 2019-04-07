import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, ImageBackground} from 'react-native';
import NavBarBottom from './NavBarBottom';

export default class SearchScreen extends Component {
  render() {
    let petUri = 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg';
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
              <View style={{backgroundColor:'green'}}>
                <ImageBackground source={{uri: petUri}} style={{width: '100%', height: '100%'}}>
                </ImageBackground>
              </View>
          </View>
          <View style={[styles.box2, styles.box]}>
            <View style={styles.petTitle}>
              <Text style={styles.petTitleText}>Fido, 3yr, M</Text>
            </View>
          </View>
          <View style={[styles.box3, styles.box]}>
            <ScrollView style={styles.petDescription}>
              <Text textBreakStrategy='simple' style={styles.petDescriptionText}>
              Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet.
              </Text>

            </ScrollView>
          </View>
          <View style={[styles.box4, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const boxBorderColor = '#5086b8';
const boxBgColor = '#4682b4';
//const boxBgColor = '#f9f9f9';
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
    //backgroundColor: '#f5f5f5',
    //backgroundColor: 'steelblue',
    //backgroundColor: '#5086b8',
    //backgroundColor: 'white',
    backgroundColor: '#4682b4',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  box: {
    backgroundColor: boxBgColor,
    margin: boxMargin,
  },
  box1: {
    flex: 8,
  },
  box2: {
    flex: 1,
  },
  box3: {
    flex: 4,
  },
  box4: {
    flex: 1,
  },
  petTitle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  petTitleText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  petDescription: {
    borderWidth: 1,
    backgroundColor: boxBorderColor,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  petDescriptionText: {
    fontSize: 24,
    padding: 5,
  },
});