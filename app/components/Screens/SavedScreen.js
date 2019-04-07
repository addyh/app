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

// Row data (hard-coded)
const rows = [
  {key: '0', text: 'Fido, 3yr, M'},
  {key: '1', text: 'Spot, 2yr, M'},
  {key: '2', text: 'Fluffy, 2yr, F'},
  {key: '3', text: 'Bear, 3yr, M'},
]

class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: this.props.pets
    }
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

  showSavedPets() {
    if (this.state.pets.savedPets.length == 0) {
      return(
        <View style={{flex:1,justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:28,fontWeight:'bold'}}>You have no pets saved.</Text>
          <Text style={{fontSize:20,}}>Go to Search and swipe right (&#8658;) to add some!</Text>
        </View>
        </View>
      );
    }
    else {
      return (
        <FlatList
          data={this.state.pets.savedPets}
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
            {this.showSavedPets()}
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
    pets: state.pets
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);