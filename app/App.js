import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import HomeScreen from './components/HomeScreen';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}

export default App;