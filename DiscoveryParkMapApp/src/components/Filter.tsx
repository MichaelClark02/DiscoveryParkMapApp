import React, { useState, useCallback } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const Filter = ({ handleBathroom, handleExits, handleStairs, handleATM, handleVending }) => {
  const [listData, setListData] = useState([
    { id: '1', title: 'Item 1', description: 'Description 1' },
    { id: '2', title: 'Item 2', description: 'Description 2' },
    { id: '3', title: 'Item 3', description: 'Description 3' },
    // Add more items as needed
  ]);

  
  

  return (
    <View>
    <View style={styles.wrapper}> 
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#4285F4'}]} onPress={handleBathroom}>
        <FontAwesome5 name="toilet" size={30} color="white" style={styles.icon} />
        <View style={[styles.colorCode, {backgroundColor: 'green'}]}> 
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Bathrooms</Text>
    </View>
      
      
      

      <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#AED581'}]} onPress={handleStairs}>
        <MaterialIcons name="stairs" size={30} color="white" style={styles.icon} />
        <View style={[styles.colorCode, {backgroundColor: 'orange'}]}>
        </View>
      </TouchableOpacity>
      <Text style = {styles.iconText}>Stairs</Text>
      </View>
      
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#9575CD'}]} onPress={handleATM}>
        
        <FontAwesome5 name="money-check-alt" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'purple'}]}>

        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>ATMs</Text>
    </View>
     
    
      <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#FF4081'}]} onPress={handleExits}>
        <FontAwesome name="fire-extinguisher" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'red'}]}>
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Emerg. Exits</Text>
      </View>
      
    <View style={styles.container}>
    <TouchableOpacity style={[styles.iconContainer, {backgroundColor: '#FFC107'}]} onPress={handleVending}>
      <Entypo name="shopping-cart" size={30} color="white" />
        <View style={[styles.colorCode, {backgroundColor: 'cyan'}]}>
        </View>
      </TouchableOpacity>
      <Text style={styles.iconText}>Vending</Text>
    </View>

    <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text>{item.title}</Text>
            {/* You can customize this part based on your data structure */}
          </View>
        )}
      />
    </View>
   
    </View>
    
  )
}


export default Filter

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around', // or 'space-between' based on your preference
    paddingHorizontal: 16,
    marginHorizontal: -8
     // Add some horizontal padding to the wrapper
  },
  container: {
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
  },
  listItemContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
})