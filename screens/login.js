import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableOpacity, Keyboard} from 'react-native';
import { color } from 'react-native-reanimated';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [marginFromTop, setMarginFromTop] = useState(200)

    Keyboard.addListener("keyboardDidShow", () => {setMarginFromTop(20)});
    Keyboard.addListener("keyboardDidHide", () => {setMarginFromTop(200)});

  return (
    <KeyboardAvoidingView
    behavior={'padding'}
    style={{marginTop: StatusBar.currentHeight + marginFromTop, ...styles.container}}
    >
      <Text style = {styles.header}> login </Text>
      <TextInput
         style={styles.input}
         placeholder="Type here to translate!"
         onChangeText={email => setEmail(email)}
         defaultValue={email}
         />
      <TextInput
         style={styles.input}
         placeholder="Type here to translate!"
         onChangeText={password => setPassword(password)}
         defaultValue={password}
         />
       <TouchableOpacity style = {styles.button}>
           <Text style ={{textAlign:'center'}}>Login</Text>
       </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    header: {
      fontSize: 30,
      marginBottom: 50,
      color: 'blue',
      fontWeight: 'bold'
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        borderColor: 'blue'
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        width: 200,
        backgroundColor: '#6670fa',
        padding: 10,
    }
  })
export default Login;
