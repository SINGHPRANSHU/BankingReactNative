import React, { useState, useContext, useEffect } from 'react';
import {Text, View, StyleSheet, StatusBar, FlatList} from 'react-native';
import { LoginContext } from '../context/logincontext'
import { CustomerContext } from '../context/cutomercontext'
import { Customer } from '../components/customer'

function Customers() {
  const [user, setuser] = useContext(LoginContext)
  const [customers, setCustomers] = useContext(CustomerContext)

 const renderItem = ({item}) => {
  return(
    <View style = { StyleSheet.customer }>
       <Customer customer ={item}/>
    </View>
  ) 
 
 }
  return (
    <View style ={styles.container}>
     <Text style = { styles.header }>Customers</Text>
     <FlatList
      data ={customers}
      renderItem = { renderItem }
      keyExtractor = {(item) => item. _id}
      extraData = {customers}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customer: {
    height: '30%',
    width: '80%'
  },
  header: {
    fontSize: 20,
    color: 'blue'
  }
})

export default Customers;
