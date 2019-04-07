import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';
import NavBarBottom from './NavBarBottom';
import * as colors from '../../styles/colors';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

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
    this.rotate = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange:['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }
    this.likeOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange:[0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange:[1, 0, 0],
      extrapolate: 'clamp'
    });
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange:[1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange:[1, .8, 1],
      extrapolate: 'clamp'
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH+100, y: gestureState.dy}
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex+1}, () => {
              this.position.setValue({x:0, y:0})
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH-100, y: gestureState.dy}
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex+1}, () => {
              this.position.setValue({x:0, y:0})
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: {x:0, y:0},
            friction: 4
          }).start()
        }
      }
    })
  }

  renderCards() {
    let petUri = 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/riley.jpg';
    return cards.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null;
      }
      else if (i == this.state.currentIndex) {
        return (
          <Animated.View
          {...this.PanResponder.panHandlers}
          key={i}
          style={[this.rotateAndTranslate, styles.layout]}>
            <View style={[styles.box1, styles.box]}>
                <View style={{backgroundColor:colors.boxLight}}>
                  <ImageBackground source={{uri: petUri}} style={{width: '100%', height: '100%'}}>
                    <Animated.View style={[{opacity: this.likeOpacity}, styles.cardViewLike]}>
                      <Text style={styles.cardLike}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[{opacity: this.dislikeOpacity}, styles.cardViewDislike]}>
                      <Text style={styles.cardDislike}>NOPE</Text>
                    </Animated.View>
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
      }
      else {
        return (
          <Animated.View
          key={i}
          style={[{opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}]}, styles.layout]}>
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
      }
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
    zIndex: 999,
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
  cardViewLike: {
    transform: [{rotate: '-30deg'}],
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 999,
  },
  cardLike: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
  },
  cardViewDislike: {
    transform: [{rotate: '30deg'}],
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 999,
  },
  cardDislike: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
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