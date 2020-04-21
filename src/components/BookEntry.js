import React, {} from 'react';
import {Text, View, } from 'react-native';

export default function BookEntry({author, title, ISBN}) {
    return (
        <View>
            <Text>
                {author} 
                {title}
            </Text>
        </View>
    )
}