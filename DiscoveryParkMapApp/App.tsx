import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import { Overlay } from 'react-native-maps';





type Coordinate = [number, number];


const a:Coordinate = [
  33.252528,-97.151805
]
const b:Coordinate = [
  33.254951,-97.153992
]



  


export default class App extends Component {
  render() {
    return (

      <MapView style={styles.map}
      showsBuildings
      initialRegion={{
        latitude: 33.25405149775475,
        longitude: -97.15271196603254,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,}}
        mapType='hybrid'
        minZoomLevel = {17.5}
        rotateEnabled
        >
          
        <Marker
            coordinate={{latitude: 33.2543,
            longitude: -97.1518}}
            title={"title"}
            description={"description"}
         />
         <Overlay
            bounds = {[a,b]}
            image ={{ uri: 'https://cdn.3axis.co/user-images/e1gklqmo.jpg'}}

         />
      </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },

})