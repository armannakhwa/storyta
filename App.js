/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';

 import Icon from 'react-native-vector-icons/Ionicons';


 import React from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   FlatList,
   ScrollView,
   Linking,
   Button,
 } from 'react-native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InstagramScreen from './screens/InstagramScreen';
import WhatsAppScreen from './screens/WhatsAppScreen';
import SettingScreen from './screens/SettingScreen';


function Instagram()  {
  return (
    
<InstagramScreen/>

  )
}

function WhatsApp() {
  return (

<WhatsAppScreen/>

  )
}

function Setting() {
  return (

<SettingScreen/>

  )
}



const Tab = createBottomTabNavigator();


export default function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Instagram"
       tabBarOptions={{
        activeBackgroundColor:'#4FC3F7',
        inactiveBackgroundColor:'#E0F2F1',
        activeTintColor:'white',
        inactiveTintColor:'black',
       }}
      
      >
      <Tab.Screen name="Instagram" component={Instagram}

      options={{
        tabBarLabel: 'Instagram',
       activeBackgroundColor:'red',
        tabBarIcon: ({ color, size }) => (
          <Icon name="logo-instagram" color='#e95950' size={30} 
          />
        ),
      
      }}
      
      
      />
      <Tab.Screen name="WhatsApp" component={WhatsApp} 

       options={{
        tabBarLabel: 'WhatsApp',
        tabBarIcon: ({ color, size }) => (
          <Icon name="logo-whatsapp" color='green'  size={30} 
          />
  
        ),
      }}
      
      />

<Tab.Screen name="Setting" component={SettingScreen} 

options={{
 tabBarLabel: 'Setting',
 tabBarIcon: ({ color, size }) => (
   <Icon name="settings-outline" color='blue'  size={30} 
   
   />
 ),
}}

/>
         
    </Tab.Navigator>

    </NavigationContainer>

  );
}