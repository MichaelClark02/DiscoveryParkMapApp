import React, { useCallback, useMemo, useRef } from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, Switch } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE,Polyline, Polygon} from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Filter from "../components/Filter";

import { LatLng, dWing, bWing, aWing, outline,hWing, kWing, gWing, perks, dWing_internal} from '../components/Floor1';
import graphData from '../components/Graph_test';
import HomeSearch from '../components/HomeSearch';


type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.256380, -97.150260
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

  //search var
  const [search, setSearch] = useState('');
  const [endNode, setEndNode] = useState('');
  const [shortestRoute, setShortestRoute] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '80%'], []);
  
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  
  const [txt, setTxt] = useState('');
  console.log(endNode);
  const calculateShortestRoute = () => {
    const startNode = 'E1'; // Update with your desired starting node
    const endNode = search; // Update with your desired ending node

    const path = route.path(startNode, endNode, { cost: true });

    // Ensure the path is continuous
    const continuousPath = [startNode, ...path.path];

    setShortestRoute(continuousPath);
    setPolylineCoordinates(path.coordinates); // Set the polyline coordinates
  };

  useEffect(()=> {
    setEndNode(search)
    endNode ? (
      calculateShortestRoute()
    ) : (
      null
    )
    //calculateShortestRoute();
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
  }, [lat, lon, search, endNode])

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
        <GestureHandlerRootView style={{flex: 1}}>

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
      
      {(!isEnabled) ? 
        // First floor case
        (
        <View> 
          <Overlay
            bounds={[topLeftOverlay, bottomRightOverlay]}
            image={{
            uri: 'https://preview.redd.it/h12geouyt0zb1.png?width=640&crop=smart&auto=webp&s=211838092890ac1a247293645cc70af34a8e06d',
          }}
          opacity={1}
          //bearing={0}
          //tappable={false}
          />

          <Polygon
            coordinates={outline.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(176, 175, 171, 1)" // Specify the fill color (green with some transparency)
            />

          <Overlay
            bounds={[topLeftOverlay, bottomRightOverlay]}
              image={{
                uri: 'https://preview.redd.it/h12geouyt0zb1.png?width=640&crop=smart&auto=webp&s=211838092890ac1a247293645cc70af34a8e06d',
              }}
              opacity={1}
              //bearing={0}
              //tappable={false}
          />
        
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
            strokeWidth={4}
          />

          <Polyline
            coordinates={dWing_internal.map((location: LatLng) => ({
              latitude: location.latitude,
              longitude: location.longitude,
            }))}
            strokeColor="green"
            strokeWidth={4}
          />

          

          <Polygon
            coordinates={dWing.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
          />

          <Polygon
            coordinates={bWing.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(32, 168, 13, 0.5)" // Specify the fill color (green with some transparency)
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

          <Polyline
            coordinates={hWing.map((location: LatLng) => ({
              latitude: location.latitude,
              longitude: location.longitude,
            }))}
            strokeColor="green"
            strokeWidth={4}
          />

          <Polygon
            coordinates={hWing.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(255, 253, 248, 0.5)" // Specify the fill color (green with some transparency)
          />

          <Polyline
            coordinates={kWing.map((location: LatLng) => ({
              latitude: location.latitude,
              longitude: location.longitude,
            }))}
            strokeColor="green"
            strokeWidth={4}
          />

          <Polyline
            coordinates={gWing.map((location: LatLng) => ({
              latitude: location.latitude,
              longitude: location.longitude,
            }))}
            strokeColor="green"
            strokeWidth={4}
          />
          <Polygon
            coordinates={gWing.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(32, 168, 13, 0.5)" // Specify the fill color (green with some transparency)
          />

          <Polyline
            coordinates={perks.map((location: LatLng) => ({
              latitude: location.latitude,
              longitude: location.longitude,
            }))}
            strokeColor="green"
            strokeWidth={4}
          />
          <Polygon
            coordinates={perks.map((location: LatLng) => ({
                latitude: location.latitude,
                longitude: location.longitude,
              }))}
              fillColor="rgba(216, 219, 18, 0.5)" // Specify the fill color (green with some transparency)
          />

        </View>
      ) :
      // 2nd floor case
      null}

      <View style={styles.switchContainer}>
        <Switch
          trackColor={{false: '#767577', true: '##0085'}}
          thumbColor={isEnabled ? '#white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
       
      </View>
    </MapView>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={styles.sheetBackground}
      keyboardBehavior="fillParent"
      animateOnMount
    >
        <BottomSheetTextInput style={styles.input} placeholder="Where to?" 
        onChangeText={newText => setTxt(newText)}
        onSubmitEditing={searchText => setSearch(txt)}
        />
        <View style={styles.contentContainer}>
          <Filter />
        </View>
      </BottomSheet>

    
  </SafeAreaView>
  </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    map: {
      width: '100%',
      height: '100%',
    },
    bottomBar: {
      flex: 1,
      backgroundColor: 'white',
      marginVertical: 1,
      paddingTop: 25,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    
    switchContainer: {
        position: 'absolute',
        margin: 16,
        top: '40%',
        right: 0
    
    },
    switch: {
      transform: [{ rotate: '270deg' }],
      right: 0
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    sheetBackground: {
      backgroundColor: '#f0f0f0',
    },
    input: {
      margin: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 10,

      backgroundColor: 'rgba(151, 151, 151, 0.25)',

    }

})
