/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project
import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home'
import Customers from './screens/customers'
import Login from './screens/login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from './context/logincontext'
import { CustomerContext } from './context/cutomercontext'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  const [user, setUser] = useState(null)
  const [customers, setcustomers] = useState([])
 
  useEffect(() => {
    AsyncStorage.getItem('expire').then(data => {
      if(data){
        if(data < new Date().getTime()){
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('expire')
        }else{
          AsyncStorage.getItem('token').then(data => {
            if(data){
              setUser(JSON.parse(data))
            }
          }).catch(() => {})
        }
      }
    }).catch(() => {})
  },[])

  useEffect(() => {
    if(user){
      fetch('https://transactionrest.herokuapp.com/api/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${user.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        const newData = data.filter(d => d._id !== user._id)
        setcustomers([...newData])
         
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [user])

 
  
  return (
    <LoginContext.Provider value = {[ user, setUser ]}>
      <CustomerContext.Provider value ={[customers, setcustomers]}>
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
      </CustomerContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
