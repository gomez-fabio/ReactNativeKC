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

  checkIsSelected(item) {
    if((this.state.selected != null) && (this.state.selected.id == item.id)) {
      return true
    } else {
      return false
    }
  }

  pintaCelda(item, index) {
    const isSelected = this.checkIsSelected(item)
    const cellStyle = isSelected ? {backgroundColor: Colors.blue} : {backgroundColor: 'grey'}
    const titleStyle = isSelected ? {color: 'white', fontWeight: 'bold'} : {color: 'black'}

    return (
      // diferentes estilos en un array, preeminencia del último
      <View style = {[styles.cell, cellStyle]}> 
        <Text style ={titleStyle} >{ item.nombre }</Text>
        <Text style ={titleStyle} >{ item.lema }</Text>
        <Text style ={titleStyle} >{ index }</Text>
        {/* <Button 
          title = {'Seleccionar casa'}
          // onPress = {()=> console.log("celda pulsada: ", item)}
          onPress = {()=> this.setState({ selected: item })}
          color={'white'}
        /> */}

        <TouchableOpacity style={styles.button} onPress= { () => this.setState( {selected: item} ) }>
        
          <Text style={styles.buttonText}>{'Seleccionar casa'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const nombre = this.state.selected ? this.state.selected.nombre : '' // Ternario para comprobar que no es null, que lo es al cargar por primera y hasta que se selecciona alguna celda.
    return (
      <View style={styles.container}>
        <Text style={styles.title}> { 'Casa seleccionada: ' + nombre } </Text>
        <FlatList
          data ={this.state.list} //La propiedad data espera un array, le paso la lista
          //renderItem={ (datos) => this.pintaCelda(datos.item,datos.index)} // Recibimos un objeto "datos", luego cogemos las propiedades, o cogemos las propiedades directamente.
          renderItem={ ({item, index}) => this.pintaCelda(item,index)} //Con cada elemento de la lista llamo al pintaCelda
          keyExtractor= { (item,index) => item.id } // un id unico que le tenemos que indicar a Flatlist de cada elemento, en este caso el campo id
          extraData={this.state} //mira en la doc, no refrescaba porque no tenía esto puesto..
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cell: {
    height: 200, 
    marginVertical: 10
  },
  title: {
    fontSize:20, 
    textAlign: 'center',
    marginVertical:20
  },
 button:{
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
    padding: 10,
    borderRadius: 12
 },
 buttonText:{
   color: 'black',
   fontSize: 18,
   textAlign: 'center'
 }
})