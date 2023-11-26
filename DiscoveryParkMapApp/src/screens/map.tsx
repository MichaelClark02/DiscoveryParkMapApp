import React, { useCallback, useMemo, useRef } from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, Switch } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE,Polyline, Polygon} from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Filter from "../components/Filter";
import Filter2 from "../components/Filter2";
import { LatLng, dWing, bWing, aWing, outline,hWing, kWing, gWing, perks, dWing_internal, guideA, emerg1, emerg2, emerg3, rest1, rest2, supp1, supp2, s, eWing, eWing1, eWing2, eWing3, eWing4, guide} from '../components/Floor1';
import graphData from '../components/Graph_test';
import RouteInfoBar from "../components/RouteInfoBar";


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
  const [contentType, setContentType] = useState('filter');
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
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
  const snapPoints = useMemo(() => ['25%', '80%', '70%'], []);
  
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  
  const [txt, setTxt] = useState('');
  console.log(endNode);

  const handleStartRoute = () => {
    setShowRouteInfo(false);
    bottomSheetRef.current?.snapToIndex(0); 
  };

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
              {showRouteInfo && (
                <RouteInfoBar
                  roomName={selectedRoom}
                  onStartRoute={handleStartRoute}
                />
              )} 
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
                <View style={styles.switchContainer}> 
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
                  <Polygon
                    coordinates={emerg1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={emerg2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={emerg3.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={rest1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.99)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={rest2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.99)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={supp1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={supp2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polyline
                    coordinates={s.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing1.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing2.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing3.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing3.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing4.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing4.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={guide.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="red"
                    strokeWidth={4}
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
                onFocus={() => {
                  // Set the snap point to 80% when the TextInput is focused
                  bottomSheetRef.current?.snapToPosition(1);
                }}
                onChangeText={newText => {
                  setTxt(newText);
                  setContentType(newText.trim() !== '' ? 'result' : 'filter');
                }}
                onSubmitEditing={searchText => {
                  setSearch(txt);
                  setContentType('result')
                }}
                />
              <View style={styles.contentContainer}>
                {contentType === 'filter' ? (
                  <Filter />
                ) : (
                  <Filter2
                    nodes={nodes}
                    txt={txt}
                    setSearch={setSearch}
                    setContentType={(type) => {
                      if (type === 'result') {
                        setShowRouteInfo(true);
                      }
                      setContentType(type);
                    }}
                    setSelectedRoom={setSelectedRoom}
                  />
                )}
                
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
