import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import * as colors from '../styles/colors';

// The Saved Pet Details Modal Screen - show details for a saved pet
class PetInfoModal extends Component {

  static navigationOptions = ({ navigation }) => ({
    // Set header title
    title: `${navigation.getParam('name')}, ${navigation.getParam('age')}yr, ${navigation.getParam('sex')}`,
    headerTintColor: 'black',          // Set back button too on ios (on android is same)
    headerTitleStyle: {color:'black'}, // Set header text color
    headerStyle: {
      backgroundColor: colors.boxDark  // Set background color of the modal's header box
    }
  });

  render() {
    // Get the pet info details from the passed in navigation param
    const {age, id, src, name, profile, sex, type} = this.props.navigation.getParam('pet');
    return (
      <View style={styles.container}>
        <View style={styles.paragraph}>
          <View style={styles.box1}>
            <ImageBackground source={{uri: src}} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={styles.box2}>
            <ScrollView style={styles.petDescription}>
              <Text textBreakStrategy='simple' style={styles.petDescriptionText}>
                {profile}
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxMedium,
  },
  paragraph: {
    flex: 1,
    padding: 10
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
    paddingTop: 10,
  },
  petProfileText: {
    fontSize: 54,
  },
  petDescription: {
    borderWidth: 1,
    backgroundColor: colors.boxMedium,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  petDescriptionText: {
    fontSize: 28,
    padding: 5,
  },
});

export default PetInfoModal;