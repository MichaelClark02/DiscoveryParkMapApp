import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import { Overlay } from 'react-native-maps';



const OVERLAY_TOP_LEFT_COORDINATE = [35.68184060244454, 139.76531982421875];
const OVERLAY_BOTTOM_RIGHT_COORDINATE = [35.679609609368576, 139.76806640625];

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
      initialRegion={{
        latitude: 33.2543,
        longitude: -97.1518,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,}}
        mapType='satellite'
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