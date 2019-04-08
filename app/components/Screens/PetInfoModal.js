import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as colors from '../../styles/colors';

class PetInfoModal extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
    headerStyle: {
      backgroundColor: colors.boxDark
    }
  });

  render() {
    const {age, id, img, name, profile, sex, type} = 
      this.props.navigation.getParam('pet');
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {age}, {id}, {img}, {name}, {profile}, {sex}, {type}
        </Text>
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
    padding: 20,
  },
});

export default PetInfoModal;