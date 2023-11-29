// FilteredNodesList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';

const Filter2 = ({ nodes, txt, setSearch, setContentType, setSelectedRoom, bottomSheetRef, handleSelection, setNodeName, setNodeDept }) => (
  <View style={styles.scrollView}>
    {nodes
      .filter(node => node.name.includes(txt) && node.reachable === true)
      .map(filteredNode => (
        <TouchableOpacity
          key={filteredNode.name}
          style={styles.button}
          onPress={() => {
            setSearch(filteredNode.name);
            setSelectedRoom(filteredNode.name);
            setNodeName(filteredNode.name);
            setNodeDept(filteredNode.dept);
            setContentType('result');
            bottomSheetRef.current?.close();
            handleSelection();
            Keyboard.dismiss();
          }}
        > 
          <Text style={styles.buttonText}>
            <Text>{filteredNode.name}              {filteredNode.wing}                {filteredNode.dept}</Text>

            </Text>
        </TouchableOpacity>
      ))}
  </View>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  button: {
    width: 360,
    height: 35, // Adjust the height of the TouchableOpacity if needed
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 50, 
    
    
  },
  buttonText: {
    color: 'black', // Change the text color as needed
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 5
  },
});


export default Filter2;
