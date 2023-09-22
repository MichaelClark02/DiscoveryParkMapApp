import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";

export default class App extends Component {
  render() {
    return (
      <MapView style={styles.map}
      initialRegion={{
        latitude: 33.2543,
        longitude: -97.1518,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,}}
        mapType='hybrid'
        >
        <Marker
            coordinate={{latitude: 33.2543,
            longitude: -97.1518}}
            title={"title"}
            description={"description"}
         />
      </MapView>

    );
  }
}

var markers = [
  {
    latitude: 45.65,
    longitude: -78.90,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];
const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },

})