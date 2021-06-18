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
import Me from './screens/me'
import Transfer from './screens/transfer'
import Login from './screens/login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from './context/logincontext'
import { CustomerContext } from './context/cutomercontext'
import { ProfileContext } from './context/me'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  const [user, setUser] = useState(null)
  const [customers, setcustomers] = useState([])
  const [profile, setProfile] = useState({}) 
 
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
        const newData = data.filter(d => d._id !== user._id)
        setcustomers([...newData])
         
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    

    fetch('https://transactionrest.herokuapp.com/api/customer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.token}`
      }
    })
    .then(res => res.json())
    .then(profile => {
      setProfile(profile)
    })
    .catch(err => {})

  }

  }, [user])

 
  
  return (
    <LoginContext.Provider value = {[ user, setUser ]}>
      <CustomerContext.Provider value ={[customers, setcustomers]}>
        <ProfileContext.Provider value = {[profile, setProfile]}>
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
                        } else if(route.name === 'Login'){
                          return <Anticons name = {'login'} size={size} color={color} />
                        }else if(route.name === 'Profile'){
                          return <FontAwesomeIcons name = {'user-circle'} size={size} color={color}/>
                        }else if(route.name === 'Transfer'){
                          return <MaterialCommunityIcons name = {'bank-transfer'} size={size} color={color}/>
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
              {user &&<Tab.Screen name="Customers" component={Customers} />}
              {user && <Tab.Screen name="Profile" component={Me} />}
              {user && <Tab.Screen name="Transfer" component={Transfer} />}     
              {!user && <Tab.Screen name="Login" component={Login} />}
            
            </Tab.Navigator>
          </NavigationContainer>
        </ProfileContext.Provider>
      </CustomerContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
