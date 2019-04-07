import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Animated,
  PanResponder
} from 'react-native';
import NavBarBottom from './NavBarBottom';
import * as colors from '../../styles/colors';

const cards = [
  { id: "1", text: './assets/1.jpg' },
  { id: "2", text: './assets/2.jpg' },
]

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    }
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {

      }
    })
  }

  renderCards() {
    let petUri = 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/riley.jpg';
    return cards.map((item, i) => {
      return (
        <Animated.View
        {...this.PanResponder.panHandlers}
        key={i}
        style={[{transform: this.position.getTranslateTransform()},styles.layout]}>
          <View style={[styles.box1, styles.box]}>
              <View style={{backgroundColor:colors.boxLight}}>
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
                {item.text}
              </Text>
            </ScrollView>
          </View>
          <View style={[styles.box4, styles.box]}>
            <NavBarBottom />
          </View>
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        {this.renderCards()}
      </View>
    );
  }
}

const boxMargin = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 36 : 0,
    backgroundColor: colors.boxDark,
  },
  layout: {
    flex: 1,
    backgroundColor: colors.boxDark,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  box: {
    backgroundColor: colors.boxDark,
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
    backgroundColor: colors.boxMedium,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  petDescriptionText: {
    fontSize: 24,
    padding: 5,
  },
});