import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity
} from 'react-native';
import NavBarBottom from './NavBarBottom';
import * as colors from '../../styles/colors';
import {
  addSavedPet
} from '../../actions/petsActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      pets: this.props.pets,
      settings: this.props.settings,
      filteredPets: this.getFilteredPets(this.props),
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

  static navigationOptions = {
    header: <View />
  }

  getFilteredPets(props) {
    let settings = props ? props.settings : this.state.settings;
    let allPets = props ? props.pets.allPets : this.state.pets.allPets;
    let savedPets = props ? props.pets.savedPets : this.state.pets.savedPets;

    let savedPetIds = [];
    for (let savedPet of savedPets) {
      savedPetIds.push(savedPet.id);
    }

    let pets = [];
    for (let pet of allPets) {
      if (!savedPetIds.includes(pet.id) &&
          pet.type == settings.typePreference &&
          pet.age >= settings.ageRange.min &&
          pet.age <= settings.ageRange.max) {
            pets.push(pet);
      }
    }
    return pets;
  }

  getCurrentPetDescription() {
    let pets =  this.state.filteredPets;
    return pets[this.state.currentIndex]?
    pets[this.state.currentIndex].profile:'';
  }

  componentWillReceiveProps(nextProps) {
    let addingSavedPet = nextProps.pets.savedPets != this.props.pets.savedPets;

    this.setState({
      pets: nextProps.pets,
      settings: nextProps.settings,
      filteredPets: this.getFilteredPets(nextProps),
      // Reset to top card when any property (ie a setting) is changed
      // except when saving a pet
      // this will prevent flipping through cats and dogs at the same time
      currentIndex: addingSavedPet ? this.state.currentIndex : 0
    })
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Swiping Right
        if (gestureState.dx > 120) {
          Animated.timing(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            duration: 100
          }).start(() => {
            //this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.props.addSavedPet(this.state.filteredPets[this.state.currentIndex]);
              this.position.setValue({ x: 0, y: 0 })
            //})
          })
        }
        // Swiping Left
        else if (gestureState.dx < -120) {
          Animated.timing(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            duration:100
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        // Rebounding / Null swipe
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
    return this.state.filteredPets.map((item, i) => {

      if (i < this.state.currentIndex) {
        return null;
      }
      else if (i == this.state.currentIndex) {
        // Current card
        return (
          <Animated.View
          {...this.PanResponder.panHandlers}
          key={i}
          style={[this.rotateAndTranslate, styles.layout]}>
            <View style={[styles.boxA1, styles.box]}>
                <View style={{backgroundColor:colors.boxLight}}>
                  <ImageBackground source={{uri: item.img}} style={{width: '100%', height: '100%'}}>
                    <Animated.View style={[{opacity: this.likeOpacity}, styles.cardViewLike]}>
                      <Text style={styles.cardLike}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[{opacity: this.dislikeOpacity}, styles.cardViewDislike]}>
                      <Text style={styles.cardDislike}>NOPE</Text>
                    </Animated.View>
                  </ImageBackground>
                </View>
            </View>
            <View style={[styles.boxA2, styles.box]}>
              <View style={styles.petTitle}>
                <Text style={styles.petTitleText}>{item.name}, {item.age}yr, {item.sex}</Text>
              </View>
            </View>
          </Animated.View>
        );
      }
      else {
        // Next card
        return (
          <Animated.View
          key={i}
          style={[{ transform: [{scale: this.nextCardScale}]}, styles.layout]}>
            <View style={[styles.boxA1, styles.box]}>
                <Animated.View style={{opacity: this.nextCardOpacity,backgroundColor:colors.boxLight}}>
                  <ImageBackground source={{uri: item.img}} style={{width: '100%', height: '100%'}}>
                  </ImageBackground>
                </Animated.View>
            </View>
            <View style={[styles.boxA2, styles.box]}>
              <View style={styles.petTitle}>
                <Text style={styles.petTitleText}>{item.name}, {item.age}yr, {item.sex}</Text>
              </View>
            </View>
          </Animated.View>
        );
      }
    }).reverse();
  }

  renderEndOfDeck() {
    // End of stack, no more cards
    if (this.state.pets.allPets.length != 0 &&
      this.state.pets.allPets.length == this.state.pets.savedPets.length) {
        return (
          <View style={{padding:20,flex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:52,fontWeight:'bold',paddingBottom:20}}>Uh oh!</Text>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold',paddingBottom:20}}>You've liked all of our pets!</Text>
            <Text style={{textAlign:'center',fontSize:20}}>This page will automatically update when more pets become available for adoption.</Text>
          </View>
        </View>
        );
    }
    // End of stack, try changing settings
    else if (this.state.pets.allPets.length > 0 &&
      this.state.currentIndex == 0 &&
      this.state.filteredPets.length == 0) {
      return (
        <View style={{padding:20,flex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:52,fontWeight:'bold',paddingBottom:20}}>Uh oh!</Text>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold'}}>You've reached the</Text>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold'}}>end of the stack!</Text>
            <Text style={{textAlign:'center',fontSize:20,paddingTop:20}}>Try modifying your settings to see more pets.</Text>
          </View>
        </View>
      );
    }
    // End of stack, restack button
    else if (this.state.pets.allPets.length > 0 &&
      this.state.currentIndex == this.state.filteredPets.length &&
      this.state.currentIndex > 0) {
      return (
        <View style={{padding:20,flex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold'}}>You've reached the</Text>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold',paddingBottom:60}}>bottom of the stack.</Text>
            <TouchableOpacity onPress={() => this.setState({currentIndex:0})} style={{borderRadius:40,backgroundColor:colors.boxLight,padding:40,}}>
              <Text style={{fontWeight:'bold',fontSize:20}}>GO BACK TO TOP OF STACK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.boxA}>
        {this.renderCards()}
        {this.renderEndOfDeck()}
        </View>
        <View style={styles.boxB}>
          <View style={[styles.boxB1, styles.box]}>
            <ScrollView style={styles.petDescription}>
              <Text textBreakStrategy='simple' style={styles.petDescriptionText}>
                {this.getCurrentPetDescription()}
              </Text>
            </ScrollView>
          </View>
          <View style={[styles.boxB2, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxDark,
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
    //backgroundColor: colors.boxDark,
    margin: 5,
  },
  boxA: {
    flex: 7,
  },
  boxA1: {
    flex: 15,
  },
  boxA2: {
    flex: 1,
  },
  boxB: {
    flex: 3,
  },
  boxB1: {
    flex: 8,
  },
  boxB2: {
    flex: 2,
  },
  cardViewLike: {
    transform: [{rotate: '-30deg'}],
    position: 'absolute',
    top: 150,
    left: 40,
    zIndex: 999,
  },
  cardLike: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'green',
    color: 'green',
    fontSize: 82,
    fontWeight: 'bold',
    padding: 10,
  },
  cardViewDislike: {
    transform: [{rotate: '30deg'}],
    position: 'absolute',
    top: 150,
    right: 40,
    zIndex: 999,
  },
  cardDislike: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'red',
    color: 'red',
    fontSize: 82,
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
    fontSize: 22,
    padding: 5,
  },
});

function mapStateToProps(state) {
  return {
    pets: state.pets,
    settings: state.settings
  }
}

const mapDispatchToProps = {
  addSavedPet
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);