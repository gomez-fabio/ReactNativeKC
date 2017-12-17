import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncCalls, Colors } from 'Test/src/commons';
import { fetch } from 'Test/src/webservices/webservices';
import HousesCell from './HousesCell'

export default class HousesList extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      list: [],
      selected: null
    }
  }

  componentWillMount() {
    fetch('/casas').then( response => {
      this.setState({ list: response.records })
    } ). catch ( error => {
      console.log("error: ", error)
    } )
  }

  OnSelect(house) {
    this.setState({selected: house})
  }

  pintaCelda(item, index) {
    return (
            <HousesCell 
              item={item} //parámetros que le pasamos al componente HousesCell como props
              OnSelect={ (house)=> this.OnSelect(house) } //parámetros que le pasamos al componente HousesCell como props
            />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data ={this.state.list} //La propiedad data espera un array, le paso la lista
          //renderItem={ (datos) => this.pintaCelda(datos.item,datos.index)} // Recibimos un objeto "datos", luego cogemos las propiedades, o cogemos las propiedades directamente.
          renderItem={ ({item, index}) => this.pintaCelda(item,index)} //Con cada elemento de la lista llamo al pintaCelda
          keyExtractor= { (item,index) => item.id } // un id unico que le tenemos que indicar a Flatlist de cada elemento, en este caso el campo id
          extraData={this.state} //mira en la doc, no refrescaba porque no tenía esto puesto..
          numColumns={2}

        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1, // En la vista padre ponemos el flex a 1 para que ocupe toda la pantalla
    backgroundColor: 'rgb(42,42,42)',
    paddingVertical: 20,
  }
})