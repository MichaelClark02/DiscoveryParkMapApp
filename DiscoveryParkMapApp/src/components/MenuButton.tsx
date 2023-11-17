import React from 'react'
import { View, TouchableOpacity, Button, StyleSheet, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Menu from './Menu';
import Navigator from '../../Navigator'


function MenuButton() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Menu')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
        >
          <Entypo name="menu" size={40} color="#1F6722" />
        </TouchableOpacity>
    </View>
    
  )
}

export default MenuButton

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'flex-end', 
    
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 50,
    margin: 10,
    padding: 3
  }

})