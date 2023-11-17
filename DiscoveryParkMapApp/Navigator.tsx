import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './src/screens/map';
import Menu from './src/components/Menu';

const Stack = createStackNavigator();

function StackNav() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
    )
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
    )
}
