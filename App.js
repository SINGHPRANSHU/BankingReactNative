/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home'
import Customers from './screens/customers'
import Login from './screens/login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [user, setUser] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('expire').then(data => {
      if(data){
        console.log('e',data,new Date().getTime(),data < new Date().getTime());
        if(data < new Date().getTime()){
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('expire')
        }else{
          AsyncStorage.getItem('token').then(data => {
            if(data){
              console.log('m',data);
              setUser(data)
            }
          }).catch(() => {})
        }
      }
    }).catch(() => {})
  },[])

 
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = {"Home"}
          screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home'
                      : 'home-outline';
                  } else if (route.name === 'Customers') {
                    iconName = focused ? 'man' : 'man-outline';
                  } else if(route.name === 'login'){
                    return <Anticons name = {'login'} size={size} color={color} />
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        {user?<Tab.Screen name="Customers" component={Customers} />:<Tab.Screen name="login" component={Login} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
