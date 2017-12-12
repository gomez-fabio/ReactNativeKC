import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Screen1 extends Component {

  goScreen2() {
    Actions.screen2( { texto: "Texto prueba "} )
  }

  render() {
    return (
      <View>
        <Text>SCREEN 1</Text>
        <Button
          onPress={ () => this.goScreen2() }
          title="Ir a la pantalla 2"
        />
      </View>
    )
  }

}
