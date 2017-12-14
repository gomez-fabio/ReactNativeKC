import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from 'Test/src/sections/houses/HousesList'

import * as webservices from 'Test/src/webservices/webservices'


export default class App extends Component {

    componentWillMount() {
        webservices.configureAxios()
    }
    
    render() {

        return (
            <Router>
                <Scene key="root">
                    <Scene 
                        key={ 'HousesList' }
                        component={ HousesList }
                    />
                </Scene>
            </Router>
        );
    }

}

const styles = StyleSheet.create({

});