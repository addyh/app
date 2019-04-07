import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';

class NavBarBottom extends Component {
  constructor(props) {
    super(props);
    this.highlightIfOnScreen = this.highlightIfOnScreen.bind(this);
  }

  highlightIfOnScreen (screen) {
    let currentScreen = this.props.navigation.state.routeName;
    if (currentScreen==screen) {
      return {
        backgroundColor: '#6096c8'
      };
    }
  }

  render() {
    return (
      <View style={styles.navBottom}>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Search')]}
          onPress={() => this.props.navigation.navigate('Search')}>Search</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Saved')]}
          onPress={() => this.props.navigation.navigate('Saved')}>Saved</Text>
        <Text style={styles.navBottomText}> | </Text>
        <Text style={[styles.navBottomText, this.highlightIfOnScreen('Settings')]}
          onPress={() => this.props.navigation.navigate('Settings')}>Settings</Text>
      </View>
      );
  }
}
const boxBorderColor = '#5086b8';

const styles = StyleSheet.create({
  navBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  navBottomText: {
    fontSize: 32,
  },
});

export default withNavigation(NavBarBottom);