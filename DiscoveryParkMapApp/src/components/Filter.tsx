import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Filter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.filterText}>Bathrooms</Text>
      <FontAwesome5 name="toilet" size={24} color="black" style={styles.icon} />
      <View style={styles.color}> 
      <Text>    </Text>
       </View>
    </View>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  filterText: {
    fontSize: 12
  },
  icon: {
    marginTop: 4
  },
  color: {
    marginTop: 4,
    backgroundColor: 'green',
    borderRadius: 20
  }
})

export default Filter