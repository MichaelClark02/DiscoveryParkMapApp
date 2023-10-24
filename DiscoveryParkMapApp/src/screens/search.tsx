import React from "react";
import { Text, View, StyleSheet, SafeAreaView,TextInput, Button, } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE} from "react-native-maps";
import { Component, useState } from 'react';
import * as Location from 'expo-location';


type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.256400, -97.150330
]
const topLeftOverlay:Coordinate = [
  33.251650, -97.155400
]

var floor1 = true;
var op = 0.4;




export default function Search() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const [lat,setLat] = useState(0.0);
  const [long,setLong] = useState(0.0)

  const [fromText, setFromText] = useState('');
  const [destinationText, setDestinationText] = useState('');

      if(floor1){
        op = 0.4
      }
      else{
        op =0
      };
      return (
        <SafeAreaView>
          <View style={styles.searchInput}>
            <TextInput 
              value={fromText}
              onChangeText={setFromText}
              style={styles.textInput} 
              placeholder="From: Current Location"/>
            <TextInput 
              value={destinationText}
              onChangeText={setDestinationText}
              style={styles.textInput} 
              placeholder="Where to ?"/>
          </View>

          <MapView style={styles.map}
          showsBuildings
          showsUserLocation
          followsUserLocation
          //provider={PROVIDER_GOOGLE}
          userLocationPriority = {"high"}
        

          initialRegion = {{
            latitude: 33.25405149775475,
            longitude: -97.15271196603254,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,}}
            mapType='hybrid'
            // minZoomLevel = {17.5}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: '#D9D9D9'
    },
    map: {
      width: '100%',
      height: '93%',
      opacity: 0.25,
    },
    textInput: {
      height: 40,
      marginHorizontal: 5,
      marginVertical: 2,
      backgroundColor: 'white'
    },
    searchInput: {
      padding: 10,
      
    }
})

