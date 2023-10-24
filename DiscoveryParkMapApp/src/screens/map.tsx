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




export default function Map() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const [lat,setLat] = useState(0.0);
  const [long,setLong] = useState(0.0)
  const [currFloor, setCurrFloor] = useState(0);
  // useEffect(() => {
    
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setCurrentLocation(location.coords);

    //   setInitialRegion({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.005,
    //     longitudeDelta: 0.005,
    //   });
    // };
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 10, // Update location every second (adjust as needed)
      },
      (location) => {
        const newLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCurrentLocation(newLocation);
      }
    );
  };



    getLocation();
  }, []);


  */


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
          //provider={PROVIDER_GOOGLE}
          userLocationPriority="high"
          initialRegion={{
            latitude: 33.25405149775475,
            longitude: -97.15271196603254,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          mapType="hybrid"
          rotateEnabled
          >
    
            <Marker
                coordinate={{latitude: 33.2543,
                longitude: -97.1518}}
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

var markers = [
  {
    latitude: 45.65,
    longitude: -78.90,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];
