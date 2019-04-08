import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground
} from 'react-native';
import NavBarBottom from './NavBarBottom';
import * as colors from '../../styles/colors';

class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: this.props.pets,
      settings: this.props.settings,
      filteredPets: this.getFilteredPets(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pets: nextProps.pets,
      settings: nextProps.settings,
      filteredPets: this.getFilteredPets(nextProps)
    })
  }

  getFilteredPets(props) {
    let settings = props ? props.settings : this.state.settings;
    let savedPets = props ? props.pets.savedPets : this.state.pets.savedPets;

    return savedPets;

    let pets = [];
    for (let pet of savedPets) {
      if (pet.type == settings.typePreference &&
          pet.age >= settings.ageRange.min &&
          pet.age <= settings.ageRange.max) {
            pets.push(pet);
      }
    }
    return pets;
  }

  onPress(data) {
    console.log(data);
  }

  extractKey({id}) {
    return id.toString();
  }

  renderRow(row) {
    const {age, img, name, profile, sex} = row.item;
    return (
      <TouchableOpacity onPress={() => this.onPress(row)}>
        <View style={styles.row}>
          <View style={styles.petImage}>
          <ImageBackground source={{uri: img}} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{name}, {age}yr, {sex}</Text>
            <Text numberOfLines={2} textBreakStrategy='simple' style={styles.petDescription}>{profile}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSavedPets() {
    // No saved pets
    if (this.state.pets.savedPets.length == 0) {
      return(
        <View style={{flex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:32,fontWeight:'bold',paddingBottom:20}}>You have no pets saved.</Text>
            <Text style={{fontSize:20}}>Go to Search and swipe right (&#8658;)</Text>
            <Text style={{fontSize:20}}>on a photo to add some!</Text>
          </View>
        </View>
      );
    }
    // Saved pets, but settings changed
    else if (this.state.filteredPets.length == 0) {
      return(
        <View style={{padding:20,flex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:32,fontWeight:'bold'}}>You have saved pets,</Text>
            <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold',paddingBottom:40}}>but they are hidden.</Text>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:20}}>You have recently changed your settings, and none of your saved pets match your new settings.</Text>
            <Text style={{textAlign:'center',fontSize:20}}>Try making your settings less strict, or go back to Search and swipe some more!</Text>
          </View>
        </View>
      );
    }
    // Show saved pets
    else {
      return (
        <FlatList
          data={this.state.filteredPets}
          renderItem={this.renderRow}
          keyExtractor={this.extractKey}
        />
      );
    }
  }

  render() {
    // console.log('saved',this.props);
    // console.log('saved',this.state);
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            {this.renderSavedPets()}
          </View>
          <View style={[styles.box2, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
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
  },
  box: {
    backgroundColor: colors.boxDark,
    margin: boxMargin,
  },
  box1: {
    flex: 13,
  },
  box2: {
    flex: 1,
  },
  row: {
    padding: 5,
    margin: 5,
    backgroundColor: colors.boxLight,
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

function mapStateToProps(state) {
  return {
    pets: state.pets,
    settings: state.settings
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);