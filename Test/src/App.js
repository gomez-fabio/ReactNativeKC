import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from './sections/houses/HousesList';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key = { 'HousesList'}
            component = { HousesList }
          />
          </Scene>

      </Router>
    );
  }
}

const styles = StyleSheet.create({
});
