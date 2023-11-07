import React from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE} from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';

import HomeSearch from '../components/HomeSearch';




type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.256400, -97.150330
]
const topLeftOverlay:Coordinate = [
  33.251650, -97.155400
]

var floor1 = true;
var op = 0.4;



export default function Map()  {
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);
  // useEffect(() => {
    
    // const getLocation = async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     console.log("Permission to access location was denied");
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setCurrentLocation(location.coords);

    //   setInitialRegion({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.005,
    //     longitudeDelta: 0.005,
    //   });
    // };
  //   Location.watchPositionAsync(
  //     {
  //       accuracy: Location.Accuracy.High,
  //       timeInterval: 10, // Update location every second (adjust as needed)
  //     },
  //     (location) => {
  //       const newLocation = {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       };
  //       setCurrentLocation(newLocation);
  //     }
  //   );
  // };



  //   getLocation();
  // }, []);
  useEffect(()=> {
    ;(async() => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLat(location.coords.latitude)
      setLong(location.coords.longitude)
    })()
  }, [lat, lon])

      const handleMapLongPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        console.log(`Long press at latitude: ${latitude}, longitude: ${longitude}`);
      };

      if(floor1){
        op = 0.4
      }
      else{
        op =0
      };
      return (
        <SafeAreaView>
          <MapView style={styles.map}
          showsBuildings
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          userLocationPriority="high"
          initialRegion={{
            latitude: 33.25405149775475,
            longitude: -97.15271196603254,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          mapType="hybrid"
          rotateEnabled
          onLongPress={handleMapLongPress} // Handle long press on the map
          >
    
            <Marker
                coordinate={{latitude: 33.2540100377356, 
                longitude: -97.15214264759469}}
                title={"title"}
                description={"description"}
            />
            <Marker
                coordinate={{latitude: 33.25374300691001, 
                longitude: -97.15340487225396}}
                title={"title"}
                description={"description"}
            />
            <Overlay
                bounds = {[topLeftOverlay,bottomRightOverlay]}
                image ={{ uri: 'https://i.ibb.co/6yfb5qR/FLOOR1-8-1-3.png'}}
                opacity={op}
            />
            {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
            )}        
          </MapView>

          <View style={styles.bottomBar}>
            < HomeSearch/>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    map: {
      width: '100%',
      height: '93%',
    },
    bottomBar: {
      flex: 1,
      backgroundColor: 'white',
      marginVertical: 1,
      paddingTop: 25,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
})
