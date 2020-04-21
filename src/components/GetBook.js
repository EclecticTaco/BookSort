import React, {Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image, TextInput } from 'react-native';

export default class App extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        }
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText = (value) => {
        this.setState({value})
    }
    render() {
        return (
            <View>
                <View>
                    <TextInput
                    placeholder= 'Enter ISBN-10 or ISBN-13'
                    onChangeText= {this.onChangeText}
                    value= {this.state.value}
                    defaultValue= {this.state.text}
                    /> 
                </View>
                <View>
                <Button 
                onPress={() => {this.props.getBook(this.state.value)}}
                title="Grab a book!"
                />
                </View>
            </View>
        )

    }
}
