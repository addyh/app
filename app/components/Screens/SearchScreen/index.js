import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground} from 'react-native';
import NavBarBottom from '../NavBarBottom';

export default class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            <View>
              <ImageBackground source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={{width: '100%', height: '100%'}}>
                <Text>Inside</Text>
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

const cardBgColor = '#4682b4';
//const cardBgColor = '#f9f9f9';
const cardMargin = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    //backgroundColor: '#f5f5f5',
    //backgroundColor: 'steelblue',
    //backgroundColor: '#5086b8',
    backgroundColor: 'white',
    //backgroundColor: '#4682b4',
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
  petTitle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  petTitleText: {
    fontSize: 32,
  },
  petDescription: {
    borderWidth: 5,
    borderColor: '#5086b8',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  petDescriptionText: {
    fontSize: 24,
    padding: 20,
  },
});