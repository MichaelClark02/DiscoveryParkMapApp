import React from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE,Polyline} from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';


import { LatLng, dWing, bWing, aWing, outline } from '../components/Floor1';
import graphData from '../components/Graph_test';
import HomeSearch from '../components/HomeSearch';


type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.256340, -97.150260
]
const topLeftOverlay:Coordinate = [
  33.2517800, -97.155390
]

const { route, nodes } = graphData;

var floor1 = true;
var op = 0.4;


export default function Map()  {
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);

  const [shortestRoute, setShortestRoute] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  const calculateShortestRoute = () => {
    const startNode = 'a'; // Update with your desired starting node
    const endNode = 'g'; // Update with your desired ending node

    const path = route.path(startNode, endNode, { cost: true });

    // Ensure the path is continuous
    const continuousPath = [startNode, ...path.path];

    setShortestRoute(continuousPath);
    setPolylineCoordinates(path.coordinates); // Set the polyline coordinates
  };

  useEffect(()=> {
    calculateShortestRoute();
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
    <MapView
      style={styles.map}
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
      <Overlay
        bounds={[topLeftOverlay, bottomRightOverlay]}
        image={{
          uri: 'https://preview.redd.it/h12geouyt0zb1.png?width=640&crop=smart&auto=webp&s=211838092890ac1a247293645cc70af34a8e06d',
        }}
        opacity={1}
        //bearing={0}
        //tappable={false}
      />

      {shortestRoute.map((nodeName, index) => {
        const node = nodes.find((n) => n.getName() === nodeName) || { latitude: 0, longitude: 0 };
        const nextNode = nodes.find((n) => n.getName() === shortestRoute[index + 1]);

        if (!nextNode) {
          // Stop rendering polylines if nextNode is not found
          return null;
        }
      
        const nodeCoordinates = { latitude: node.latitude, longitude: node.longitude };
        const nextNodeCoordinates = { latitude: nextNode.latitude, longitude: nextNode.longitude };
      
        // Check if any coordinate is 0, if yes, return null to avoid rendering
        if (nodeCoordinates.latitude === 0 || nodeCoordinates.longitude === 0 ||
            nextNodeCoordinates.latitude === 0 || nextNodeCoordinates.longitude === 0) {
          return null;
        }
        
        return (
          <Polyline
            key={`polyline-${index}`}
            coordinates={[nodeCoordinates, nextNodeCoordinates]}
            strokeColor="blue"
            strokeWidth={4}
          />
        );
      })}

      <Polyline
        coordinates={outline.map((location: LatLng) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        }))}
        strokeColor="#FF0000"
        strokeWidth={6}
      />

      <Polyline
        coordinates={dWing.map((location: LatLng) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        }))}
        strokeColor="green"
        strokeWidth={6}
      />

      <Polyline
        coordinates={bWing.map((location: LatLng) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        }))}
        strokeColor="green"
        strokeWidth={4}
      />

      <Polyline
        coordinates={aWing.map((location: LatLng) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        }))}
        strokeColor="yellow"
        strokeWidth={6}
      />

      <Marker
        coordinate={{ latitude: 33.254806348852334, longitude: -97.153712485778 }}
        title={"K130"}
        description={"Room"}
      />
    </MapView>

    <View style={styles.bottomBar}>
      <HomeSearch />
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
