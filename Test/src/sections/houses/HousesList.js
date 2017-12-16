import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { AsyncCalls, Colors } from 'Test/src/commons'

export default class HousesList extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      list: [],
      selected: null
    }
  }

  componentWillMount() {
    console.log("AsyncCalls: ", AsyncCalls)
    AsyncCalls.fetchHousesList()
    .then((response) => {
      console.log("axios get response: ",response);
      const miLista = response.data && response.data.records ? response.data.records : []
      this.setState({ list: miLista })
    })
    .catch((error) => {
      console.log("axios get error: ",error);
    });
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
        <Button 
          title = {'Seleccionar casa'}
          // onPress = {()=> console.log("celda pulsada: ", item)}
          onPress = {()=> this.setState({ selected: item })}
          color={'white'}
        />
        {/* <Image>{ item.image_dir.Image }</Image> */}
      </View>
    )
  }

  render () {
    const nombre = this.state.selected ? this.state.selected.nombre : '' // Ternario para comprobar que no es null, que lo es al cargar por primera y hasta que se selecciona alguna celda.
    return (
      <View>
        <Text style={styles.title}> { 'Casa seleccionada: ' + nombre } </Text>
        <FlatList
          data ={this.state.list} //La propiedad data espera un array, le paso la lista
          renderItem={ ({item, index}) => this.pintaCelda(item,index)} //Con cada elemento de la lista llamo al pintaCelda
          keyExtractor= { (item,index) => item.id } // un id unico que le tenemos que indicar a Flatlist de cada elemento, en este caso el campo id
          extraData={this.state} //mira en la doc, no refrescaba porque no tenía esto puesto..
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cell: {
    height: 200, 
    marginVertical: 10
  },
  title: {
    fontSize:20, 
    textAlign: 'center',
    marginVertical:20
  }
})