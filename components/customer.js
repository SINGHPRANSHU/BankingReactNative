import React from 'react'
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'

export function Customer({customer}) {
  return (
      <View style = {styles.container}>
        <View style ={ styles.info}>
          <Text style = {styles.text}>Name</Text>  
          <Text style = {styles.text}>{customer.name}</Text> 
        </View>  
        <View style ={ styles.info}>
          <Text style = {styles.text}>Email</Text>    
          <Text style = {styles.text}>{customer.email}</Text> 
        </View>  
       <TouchableOpacity style ={{alignItems:'center', backgroundColor: '#7989f2', padding: 5, borderRadius: 20, marginHorizontal: 20}}>
           <Text style ={{justifyContent: 'center'}}>Transfer</Text>
       </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        height: 150,
        width: 300,
        padding: 20,
        borderColor: 'blue',
        justifyContent: 'space-around',
        backgroundColor: '#e6e3e3',
        borderWidth:2,
        borderColor:'#6b6969',
        borderRadius: 20,   
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text :{
        fontSize: 15
    }

}  
)