import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { AsyncCalls, Colors } from 'Test/src/commons'

export default class HousesList extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            list: [],
            selected: null,
        }
    }

    componentWillMount() {
        return AsyncCalls.fetchHousesList().then(response => {
            this.setState({ list: response })
        })
    }

    checkIsSelected(item) {
        if((this.state.selected != null) && (this.state.selected.id == item.id)) {
            return true
        } else {
            return false
        }
    }

    onSelectedItem(item) {
        
        this.setState({ selected: item })
    }

    renderItem(item, index) {

        const isSelected = this.checkIsSelected(item)
        const cellStyle = isSelected ? { backgroundColor: Colors.red } : { backgroundColor: Colors.pink }
        const titleStyle = isSelected ? { color: 'white', fontWeight: '600', fontSize: 20 } : { color: 'black' }
        const titleColor = isSelected ? 'white' : 'black'

        return (
            <View style={[styles.cell, cellStyle]}>

                <Text style={titleStyle}>{ item.nombre }</Text>

                <Button 
                    title={'Seleccionar casa'}
                    onPress={ () => this.onSelectedItem(item) }
                    color={titleColor}
                />
            </View>
        )
    }

    render() {
        const nombre = this.state.selected ? this.state.selected.nombre : ''

        return (
            <View>

                <Text style={styles.title}>{ nombre }</Text>
                <FlatList
                    data={ this.state.list }
                    renderItem={ ({ item, index }) => this.renderItem(item, index) }
                    keyExtractor={ (item, index) => item.id }
                    extraData={ this.state }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    cell: {
        height: 200, 
        marginVertical: 10,
    },

    title: {
        fontSize: 20, 
        textAlign: 'center', 
        marginVertical: 20
    }

})