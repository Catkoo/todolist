import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import splashscreen from './src/screens/splashscreen'
import firstscreen from './src/screens/first'
import login from './src/screens/login'
import register from './src/screens/register'
import homepage from './src/screens/homepage'
import account from './src/screens/account'

import edit from './src/screens/Edit'
import tambah from './src/screens/Tambah'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator 
    initialRouteName='homepage'
    screenOptions={{
      tabBarActiveTintColor: 'yellow',
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle:{
        backgroundColor: '#fff'
      },
    }}
    >
    <Tab.Screen
    name="hompage"
    component={homepage}
    options={{
      tabBarLabel: 'Homepage',
      tabBarIcon:({ color, size}) => (
        <Icon name='home' color={color} size={size}/>
      ),
    }}
    />
    <Tab.Screen
    name='account'
    component={account}
    options={{
      tabBarLabel: 'Account',
      tabBarIcon: ({ color, size}) => (
        <Icon name='account-circle' color={color} size={size}/>
      ),
    }}
    />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name='splashscreen' component={splashscreen}/>
      <Stack.Screen name='firstscreen' component={firstscreen}/>
      <Stack.Screen name='login' component={login}/>
      <Stack.Screen name='register' component={register}/>
      <Stack.Screen name='homepage' component={RootHome}/>
      <Stack.Screen name='tambah' component={tambah} />
      <Stack.Screen name='edit' component={edit} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}