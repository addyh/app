import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import NavBarBottom from './NavBarBottom';
import {
  updateProfile,
  updateAgeMin,
  updateAgeMax,
  updateTypePreference
} from '../../actions/settingsActions';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      profile: this.props.profile,
      ageRange: this.props.ageRange,
      typePreference: this.props.typePreference,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      profile: nextProps.profile,
      ageRange: nextProps.ageRange,
      typePreference: nextProps.typePreference
    });
  }

  getCleanInt(val) {
    val = val.replace( /[^0-9]/g, '');
    return val ? parseInt(val) : val;
  }

  getAnimalFromBool(bool) {
    return bool == true ? 'dog' : 'cat';
  }

  getTypePreferenceBool() {
    return this.state.typePreference == 'dog';
  }

  onToggle(isOn){
    this.props.updateTypePreference(this.getAnimalFromBool(isOn));
  }

  render() {
    console.log(this.props);
    console.log(this.state);
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
                onChangeText={(profile) => this.props.updateProfile(profile)}
                value={this.state.profile}
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
                    isOn={this.getTypePreferenceBool()}
                    onToggle={isOn => this.onToggle(isOn)}
                  />
                </View>
                <Text style={styles.dogPreferenceText}>Dog</Text>
              </View>
              <View style={styles.agePreference}>
                <Text style={styles.agePreferenceLabel}>Age</Text>
                <TextInput
                  onChangeText={(val) => this.props.updateAgeMin(this.getCleanInt(val))}
                  value={this.state.ageRange.min.toString()}
                  maxLength={3}
                  keyboardType="number-pad"
                  placeholder="min"
                  style={styles.agePreferenceMin} />
                <Text style={styles.agePreferenceTo}>to</Text>
                <TextInput
                  onChangeText={(val) => this.props.updateAgeMax(this.getCleanInt(val))}
                  value={this.state.ageRange.max.toString()}
                  maxLength={3}
                  keyboardType="number-pad"
                  placeholder="max"
                  style={styles.agePreferenceMax} />
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
const boxBgColor = '#4682b4';
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

function mapStateToProps(state) {
  return {
    id: state.settings.id,
    profile: state.settings.profile,
    ageRange: state.settings.ageRange,
    typePreference: state.settings.typePreference,
    pets: state.pets
  }
}

const mapDispatchToProps = {
  updateProfile,
  updateAgeMin,
  updateAgeMax,
  updateTypePreference
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);