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
import {withNavigation} from 'react-navigation';
import NavBarBottom from './NavBarBottom';
import * as colors from '../styles/colors';

// The Screen which shows all of the savedPets (all "liked" pets)
class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: this.props.pets,
      settings: this.props.settings,
      // Incase we don't want to show ineligible pets based on settings
      filteredPets: this.getFilteredPets(this.props)
    }
  }

  // Hide header. Make it an empty blank view
  static navigationOptions = {
    header: <View />
  }

  // Bring the redux state down
  componentWillReceiveProps(nextProps) {
    this.setState({
      pets: nextProps.pets,
      settings: nextProps.settings,
      filteredPets: this.getFilteredPets(nextProps)
    })
  }

  // If enabled,
  // Based on user settings, return only pets from savedPets that qualify
  // Right now it is disabled because of the comment block and early return
  getFilteredPets(props) {
    let settings = props ? props.settings : this.state.settings;
    let savedPets = props ? props.pets.savedPets : this.state.pets.savedPets;

    return savedPets;

    // let pets = [];
    // for (let pet of savedPets) {
    //   if (pet.type == settings.typePreference &&
    //       pet.age >= settings.ageRange.min &&
    //       pet.age <= settings.ageRange.max) {
    //         pets.push(pet);
    //   }
    // }
    // return pets;
  }

  // Navigate to modal when a row is pressed
  onPressRow(data)  {
    this.props.navigation.navigate('PetInfo', {
      // Passing all pet props down to modal
      index: data.index,
      pet: data.item,
      age: data.item.age,
      id: data.item.id,
      src: data.item.src,
      name: data.item.name,
      profile: data.item.profile,
      sex: data.item.sex,
      type: data.item.type,
    })
  }

  extractKey({id}) {
    return id.toString();
  }

  // Render each row as a touchable button
  renderRow = (row) => {
    const {age, id, src, name, profile, sex, type} = row.item;
    return (
      <TouchableOpacity onPress={() => this.onPressRow(row)}>
        <View style={styles.row}>
          <View style={styles.petImage}>
          <ImageBackground source={{uri: src}} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{name}, {age}yr, {sex}</Text>
            <Text numberOfLines={2} textBreakStrategy='simple' style={styles.petDescription}>{profile}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Render the container
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

// Bring Redux state down
function mapStateToProps(state) {
  return {
    pets: state.pets,
    settings: state.settings
  }
}

const mapDispatchToProps = {

}

// Connect to Redux and Navigation props
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SavedScreen));