import React, { useState, Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

export default function BookEntry({author, title}) {
    return (
        <View>
            <Text>
                {author} 
                {title}
            </Text>
        </View>
    )
}