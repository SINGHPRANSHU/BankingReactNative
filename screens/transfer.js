import React from 'react'
import {View, Text, StyleSheet, StatusBar} from 'react-native'

export default function Transfer() {
    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>Transfer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    },
    header: {
        fontSize: 20,
        color: 'blue'
    }
})