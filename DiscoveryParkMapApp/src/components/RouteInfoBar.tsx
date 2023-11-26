// RouteInfoBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RouteInfoBar = ({ roomName, onStartRoute }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.roomName}>{roomName}</Text>
        {/* Add additional information about the room if needed */}
      </View>
      <TouchableOpacity style={styles.startButton} onPress={onStartRoute}>
        <Text style={styles.buttonText}>Start Route</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 3, // Add elevation for a shadow effect
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RouteInfoBar;
