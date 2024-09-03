import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './views/components/login'; // Ajustar cada ruta si usas otra compu
import Register from './views/components/register'
import HomeScreen from './views/components/homescreen';
import FAQScreen from './views/components/FAQ';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Homescreen" component={HomeScreen} />
        <Stack.Screen name="FAQScreen" component={FAQScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
