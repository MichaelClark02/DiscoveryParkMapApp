import React, { useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const Filter = () => {
  const [bathroom, setBathroom] = useState(false);
  const filterChange= () => {
    setBathroom(previousState => !previousState);
  }
  const bathroomColor = {
    backgroundColor: 'green',
  };
  

  return (
    <View style={styles.wrapper}> 
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#4285F4'}]} onPress={filterChange}>
        <FontAwesome5 name="toilet" size={30} color="white" style={styles.icon} />
        <View style={[styles.colorCode, {backgroundColor: 'green'}]}> 
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Bathrooms</Text>
    </View>
      
      
      

      <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#AED581'}]}>
        <MaterialIcons name="stairs" size={30} color="white" style={styles.icon} />
        <View style={[styles.colorCode, {backgroundColor: 'orange'}]}>
        </View>
      </TouchableOpacity>
      <Text style = {styles.iconText}>Stairs</Text>
      </View>
      
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#9575CD'}]}>
        
        <FontAwesome5 name="money-check-alt" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'purple'}]}>

        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>ATMs</Text>
    </View>
     
    
      <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#FF4081'}]}>
        <FontAwesome name="fire-extinguisher" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'red'}]}>
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Emerg. Exits</Text>
      </View>
      
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#FFC107'}]}>
      <Entypo name="shopping-cart" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'cyan'}]}>
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Vending</Text>
    </View>
      
    </View>
   
  
    
  )
}


export default Filter

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    
  },
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    //flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    margin: 4,
    height: 70,
    width: 70,
    paddingTop: '2%',
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  
  iconText: {
    //fontWeight: 'bold',
    fontSize: 10
  },
  
  filterText: {
    fontSize: 12,
    alignItems: 'center'
  },
  icon: {
    marginTop: 4,
    padding: 10,
    borderRadius: 50, 
    
  },
  colorCode: {
    marginTop: 4,
    borderRadius: 20
  }
})