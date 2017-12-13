import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { AsyncCalls } from 'react_native_app/src/commons'

export default class HousesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      selected: null
    }
  }

  componentWillMount() {
    AsyncCalls.fetchHouseList()
    // Usamos arrow function en lugar de una function normal, porque esta tiene acceso al contexto que la rodea.
    .then((response) => {
      console.log("Axios get response: ", response);
      const miLista = response.data && response.data.records ? response.data.records : [] // Operador ternario
      this.setState ({ list: miLista })
    })
    .catch((error) => {
      console.log("Axios get error: ", error);
    });
    console.log("AsyncCalls: ", AsyncCalls)
  }

  checkIsSelected(item) {
    if (this.state.selected && (this.state.selected.id == item.id)) {
      return true
    } else {
      return false
    }
  }

  pintaCelda(item, index) {
    const isSelected = this.checkIsSelected(item)
    const cellStyle = isSelected ? {backgroundColor: 'pink'} : {backgroundColor: 'grey'}
    const titleStyle = isSelected ? {color: 'white'} : {color: 'black'}
    const titleColor = isSelected ? 'white' : 'black'
    return (
      <View style={ [styles.cell, cellStyle] }>
        <Text style={titleStyle}> {item.nombre} </Text>
          <Button
            title = { 'Selecciona casa' }
            onPress = { () => this.setState({selected: item}) }
            color= {titleColor}
          />
      </View>
    )
  }


    render() {
      const nombre = this.state.selected ? this.state.selected.nombre: ''
        return (
            <View>
              <Text style={styles.title}>{ nombre }</Text>
              <FlatList
                data={ this.state.list }
                renderItem={ ( {item, index} ) =>  this.pintaCelda(item, index)}
                keyExtractor={ (item, index) => item.id}
                extraData={ this.state }
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
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20
  }
})