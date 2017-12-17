import React, { Component } from 'react';
import { Platform, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default class HousesCell extends Component {

  // Donde recibimos los props podemos usar defaultProps, para poner estos valores por 
  // defecto, para que no pete la app aunque no me pasen los props.
  // También sirve como documentación del componente.
  static defaultProps = {
    onSelect : () => {},
    item: {}
  }
  
// onSelect() {
//   console.log("PULSANDO...")
// }

  render () {
    const {item, onSelect} = this.props // lo mismo que la declaración de abajo
    // const item = this.props.item
    // const onSelect = this.props.onSelect
    const image = item.image_dir ? {uri: item.image_dir} : null

    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={ ()=> this.props.OnSelect(this.props.item)}
        onLayout={ e=> this.setState({ layout: e.nativeEvent.layout }) }
      >
        <Image
          source={ image }
          style={styles.image} resizeMode={'contain'}
        />
       {/* <Text style={{ color: 'white', marginTop:20, backgroundColor: 'transparent' }}>JARL!</Text> */}

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    width: Dimensions.get('window').width /2 - 20,
    height: (Dimensions.get('window').width/2 - 20) * (857/600), // 857/600 es la proporción
    margin: 10,
    
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255,255,255,0.1)',
        shadowOpacity: 1,
        shadowOffset: { height: 4, width: 4 },
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
     })

  },

  image: {
    position: 'absolute',
    top:0,
    right:0,
    left:0,
    bottom:0,
  }
})