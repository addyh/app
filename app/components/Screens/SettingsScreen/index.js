import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ScrollView, Switch} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import NavBarBottom from '../NavBarBottom';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'I love all animals! I live in a nice big house on an acre of land, the pets will have plenty of room to run around and have fun. I work from home too so I will always be available to them. I grew up on a farm and have a great deal of experience working with animals.',
      isOnDefaultToggleSwitch: true
    };
  }

  onToggle(isOn){
    //alert('Changed to ' + isOn);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.layout}>
          <View style={[styles.box1, styles.box]}>
            <ScrollView style={styles.settings}>
              <Text style={styles.profileHeaderText}>Adopter Profile</Text>
              <TextInput
                style={styles.profileTextInput}
                multiline={true}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <Text style={styles.preferencesHeaderText}>Preferences</Text>
              <View style={styles.animalPreference}>
                <Text style={styles.animalPreferenceLabel}>Animal</Text>
                <Text style={styles.catPreferenceText}>Cat</Text>
                <View style={styles.animalPreferenceToggle}>
                  <ToggleSwitch
                    onColor='#e5e5e5'
                    offColor='#e5e5e5'
                    size='large'
                    isOn={this.state.isOnDefaultToggleSwitch}
                    onToggle={isOnDefaultToggleSwitch => {
                      this.setState({ isOnDefaultToggleSwitch });
                      this.onToggle(isOnDefaultToggleSwitch);
                    }}
                  />
                </View>
                <Text style={styles.dogPreferenceText}>Dog</Text>
              </View>
              <View style={styles.agePreference}>
                <Text style={styles.agePreferenceLabel}>Age</Text>
                <TextInput maxLength={3} keyboardType="number-pad" placeholder="min" style={styles.agePreferenceMin} />
                <Text style={styles.agePreferenceTo}>to</Text>
                <TextInput maxLength={3} keyboardType="number-pad" placeholder="max" style={styles.agePreferenceMax} />
              </View>
            </ScrollView>
          </View>
          <View style={[styles.box2, styles.box]}>
            <NavBarBottom />
          </View>
        </View>
      </View>
    );
  }
}

const boxBorderColor = '#5086b8';
const boxBgColor = 'steelblue';
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
  settings: {
    flex: 1,
    padding: 10,
  },
  profile: {
    
  },
  profileHeaderText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileTextInput: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: boxBorderColor,
    height: 300,
    textAlignVertical: 'top',
    fontSize: 24,
    padding: 10,
  },
  preferencesHeaderText: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  animalPreference: {
    flexDirection: 'row',
  },
  animalPreferenceLabel: {
    textAlignVertical: 'center',
    fontSize: 24,
    flex: 1,
  },
  catPreferenceText: {
    textAlignVertical: 'center',
    fontSize: 24,
  },
  animalPreferenceToggle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  dogPreferenceText: {
    textAlignVertical: 'center',
    fontSize: 24,
  },
  agePreference: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  agePreferenceLabel: {
    textAlignVertical: 'center',
    fontSize: 24,
    flex: 1,
  },
  agePreferenceMin: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: boxBorderColor,
    height: 50,
    width: 100,
    textAlignVertical: 'top',
    fontSize: 24,
    padding: 10,
    marginRight: 20,
  },
  agePreferenceTo: {
    textAlignVertical: 'center',
    fontSize: 24,
    marginRight: 20,
  },
  agePreferenceMax: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: boxBorderColor,
    height: 50,
    width: 100,
    textAlignVertical: 'top',
    fontSize: 24,
    padding: 10,
    marginRight: 20,
  },
});

export default SettingsScreen;