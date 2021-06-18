import React, { useContext } from 'react'
import {View, Text, StyleSheet, StatusBar} from 'react-native'
import { ProfileContext } from '../context/me'

export default function Me() {
    const [profile, setProfile] = useContext(ProfileContext)
    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>{JSON.stringify(profile)}</Text>
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