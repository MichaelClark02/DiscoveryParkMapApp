// FilteredNodesList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Filter2 = ({ nodes, txt, setSearch, setContentType, setSelectedRoom }) => (
  <ScrollView contentContainerStyle={styles.scrollView}>
    {nodes
      .filter(node => node.name.includes(txt) && node.reachable === true)
      .map(filteredNode => (
        <TouchableOpacity
          key={filteredNode.name}
          style={styles.button}
          onPress={() => {
            setSearch(filteredNode.name);
            setSelectedRoom(filteredNode.name); // Set the selected room
            setContentType('result');
          }}
        > 
          <Text style={styles.buttonText}>{filteredNode.name}                  B-wing                 CSCE Dept</Text>
        </TouchableOpacity>
      ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  button: {
    width: 395,
    height: 35, // Adjust the height of the TouchableOpacity if needed
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'black', // Change the text color as needed
    fontSize: 16,
  },
});


export default Filter2;
