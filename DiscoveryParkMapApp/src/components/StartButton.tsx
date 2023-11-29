import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const App = ({ handleStartRoute }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartRoute}>
          <Text style={styles.buttonText}>Start Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },
  buttonContainer: {
    position: 'absolute',
    right: 120,
    top: 670
  },
  button: {
    backgroundColor: '#2266e3',
    padding: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
