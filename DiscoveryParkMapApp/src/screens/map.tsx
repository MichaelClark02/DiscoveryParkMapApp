import React from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay } from "react-native-maps";
import { Component, useState, useEffect } from 'react';




type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.255164, -97.151177
]
const topLeftOverlay:Coordinate = [
  33.252490, -97.154320
]

var floor1 = true;
var op = 0.7;

export default function Map() {
      if(floor1){
        op = 0.7
      }
      else{
        op =0
      };
      return (
        <SafeAreaView>
        <MapView style={styles.map}
        showsBuildings
        showsUserLocation
        initialRegion={{
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
              image ={{ uri: 'https://i.ibb.co/svVK4qL/FLOOR1.png'}}
              opacity={op}
           />
  
            
        </MapView>
        <Button
              onPress={() => (floor1=!floor1)}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    },
    map: {
      width: '100%',
      height: '95%',
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
const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
