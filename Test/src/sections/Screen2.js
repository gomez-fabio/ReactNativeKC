import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Screen2 extends Component {

  render() {
    return (
      <View>
        <Text>SCREEN 2</Text>
        <Text>{ this.props.texto }</Text>        
      </View>
    )
  }

}
