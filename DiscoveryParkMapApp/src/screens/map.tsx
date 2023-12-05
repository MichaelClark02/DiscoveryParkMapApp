import React, { useCallback, useMemo, useRef } from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, Switch, ActivityIndicator } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE,Polyline, Polygon} from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetTextInput, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Filter from "../components/Filter";
import Filter2 from "../components/Filter2";
import { LatLng, dWing, bWing, aWing, outline,hWing, kWing, gWing, perks, dWing_internal, guideA, emerg1, emerg2, emerg3, rest1, rest2, supp1, supp2, s, eWing, eWing1, eWing2, eWing3, eWing4, guide, fWing, fWing_outline, fWing2, fWing_2, fWing_3, fWing_4, fWing_5} from '../components/Floor1';
import graphData from '../components/Graph_test';
import RouteInfoBar from "../components/RouteInfoBar";
import StartButton from "../components/StartButton";
import Destination from "../components/Destination";
import LandingPage from "./LandingPage";
import { bathrooms, exits, stairs } from '../components/FilterMapping'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';



type Coordinate = [number, number];

const bottomRightOverlay:Coordinate = [
  33.256380, -97.150260
]
const topLeftOverlay:Coordinate = [
  33.2517800, -97.155390
]

const { route, nodes, calculateDistance, GraphNode } = graphData;

var floor1 = true;
var op = 0.4;



export default function Map()  {
  const [contentType, setContentType] = useState('filter');
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  //search var
  const [search, setSearch] = useState('');
  const [endNode, setEndNode] = useState('');
  const [shortestRoute, setShortestRoute] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [destSelected, setDestSelected] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [nodeName, setNodeName] = useState(null)
  const [nodeDept, setNodeDept] = useState(null)
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [inRoute, setInRoute] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [bathroomFilter, setBathroomFilter] = useState(false);
  const [exitFilter, setExitFilter] = useState(false)
  const [stairsFilter, setStairsFilter] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [showFilterName, setShowFilterName] = useState(false)
  const [recents, setRecents] = useState([])

  const toggleSwitch = () => {
  setIsEnabled(previousState => !previousState);
  setBathroomFilter(false);
  setExitFilter(false);
  setStairsFilter(false);
  }

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.recentButton}>
        <Text style={styles.recentButtonText}>
            <Text style={{fontWeight: 'bold'}}>{item.name}              </Text>
            <Text>
            {item.wing}                {item.dept}
            </Text>

            </Text>
      </TouchableOpacity>
    ),
    []
  );
  
  const renderHeader = () => (
    // Your header content goes here
    <Text style={styles.listHeader}>Recents </Text>
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  
const handleSnapPress = useCallback((index) => {
  bottomSheetRef.current?.snapToIndex(1);
}, []);


const keyExtractor = useCallback((item, index) => index.toString(), []);

const data = useMemo(() => recents, [recents]);



  useEffect(() => {
    // This effect will be triggered whenever destSelected is updated
    if (destSelected && nodeName) {
      // Render StartButton
      setShowStartButton(true)

      // Clear the timeout if the component unmounts or if destSelected changes

    }
  }, [destSelected]);

  // variables
  const snapPoints = useMemo(() => ['25%', '30%', '70%'], []);
  
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  
  const [txt, setTxt] = useState('');
  console.log("endnode")
  console.log(endNode);

  useEffect(() => {
    // This effect will be triggered whenever search or endNode is updated
    if (endNode && search) {
      calculateShortestRoute();
    }
  }, [search, endNode]);

  useEffect(()=>{
    console.log(`startbutton: ${showStartButton}`)
  },[showStartButton])

  useEffect(()=>{
    console.log("useeffect")
    console.log(findNearestNonReachableNode(lat,lon));
  },[lat,lon])

  useEffect(()=>{
    console.log(`name: ${displayName}`)
  }, [displayName])

  useEffect(() => {
    // This effect will be triggered whenever shortestRoute is updated
    if (shortestRoute.length > 0) {
      // Log the shortest route for debugging
      console.log('Shortest Route:', shortestRoute);

    }
  }, [shortestRoute]);
  
  useEffect(()=> {
    if (lat !== 0 && lon !==0) {
      setIsLoading(false);
      handleStartRoute();
      setShowRoute(true);
    }
  }, [lat, lon])


 



  const getLocation = async () => {
    //console.log("getlocation")
    //setShowBottomSheet(false);
    setIsLoading(true);
    let location = await Location.getCurrentPositionAsync({})
    console.log("PostAsync")
    setLat(location.coords.latitude)
    setLong(location.coords.longitude)
    console.log("Lat "+location.coords.latitude + " long "+ location.coords.longitude)
    
  }

  const handleCancel = () => {
    setDestSelected(false);
    setShowStartButton(false);
    setShowRoute(false);
    setTimeout(openSheet, 500);
  
  }

  const openSheet = () => {
    bottomSheetRef.current?.expand();
    bottomSheetRef.current?.snapToPosition(0);
  }

  const handleStartRoute = async () => {
    //setIsLoading(true);
    setInRoute(true);
    console.log('start route')
    setShowStartButton(false)
    setEndNode(search)
    bottomSheetRef.current?.close();
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
      
      
    })()
    
  };

  const addToRecents = (node) => {
    //console.log(`added ${node.name}`)
    const nodeExists = recents.some(existingNode => existingNode.id === node.id);

    if (!nodeExists) {
      // If the node doesn't exist, create a new array with the new node
      const newArray = [...recents, node];
      setRecents(newArray);
    }
  }

  const handleSelection = () => {
    setShowFilterName(false)
    setDestSelected(true)
    //console.log('selected')
  }

  const handleBathroom = () => {
    setBathroomFilter((prevState)=>!prevState)
    setExitFilter(false)
    setStairsFilter(false)
  }

  const handleFilterPress = (node) => {
    nodes.filter(filteredNode=> {
      if (filteredNode.index === node.nodeIndex) {
        setSelectedRoom(filteredNode.name);
        setNodeName(filteredNode.name);
        setDisplayName(node.displayName)
        handleSelection();
        setContentType('result');
        setSearch(filteredNode.name);
        bottomSheetRef.current?.snapToPosition(0);
        setShowFilterName(true);
      }
    })
  }

  const handleExits = () => {
    setExitFilter((prevState)=>!prevState)
    setBathroomFilter(false)
    setStairsFilter(false)
  }

  const handleStairs = () => {
    setStairsFilter((prevState)=>!prevState)
    setBathroomFilter(false)
    setExitFilter(false)
  }

      // Function to find the nearest non-reachable node
  function findNearestNonReachableNode(currentLat, currentLon) {
    const nonReachableNodes = nodes.filter(node => !node.reachable);
    
    // Calculate distances and find the nearest node
    let nearestNode = null;
    let minDistance = Infinity;
    
    nonReachableNodes.forEach(node => {
      const distance = calculateDistance(currentLat, currentLon, node.latitude, node.longitude);
      if (distance < minDistance&& node.getName()!="userLocation") {
        minDistance = distance;
        nearestNode = node;
      }
    });
    
      return nearestNode;
    }
    
  
  const calculateShortestRoute = () => {

    console.log("test")

    const startNode = findNearestNonReachableNode(lat,lon); // Update with your desired starting node
    const startNodeName = startNode.getName();
    console.log("urmom")
    console.log(startNode)
    const endNode = search; // Update with your desired ending node
    console.log(endNode)
    const myLocation = new GraphNode(-1,lat,lon,"userLocation","userLocation",false)
    nodes.push(myLocation)
    //route.addNode("myLocation",{ startNode:0 })
    const path = route.path(startNodeName, endNode, { cost: true });
    console.log(path)
    // Ensure the path is continuous
    const continuousPath = [startNodeName, ...path.path];
    
    console.log(continuousPath);
    setShortestRoute([myLocation.getName(),...continuousPath]);
    setPolylineCoordinates(path.coordinates); // Set the polyline coordinates
    console.log(shortestRoute);
  };

  //Capitalize input
  useEffect(() => {
    setTxt((prevValue) => prevValue.toUpperCase());
  }, [txt]);

  // useEffect(()=> {
  //   setEndNode(search)
  //   endNode ? (
  //     calculateShortestRoute()
  //   ) : (
  //     null
  //   )
  //   //calculateShortestRoute();
  //   ;(async() => {
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       console.log('permission to access location was denied')
  //       return
  //     }
  //     let location = await Location.getCurrentPositionAsync({})
  //     setLat(location.coords.latitude)
  //     setLong(location.coords.longitude)
  //   })()
  // }, [lat, lon, search, endNode])

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
          <View style={styles.container}>
              <View>
              <MapView
              style={styles.map}
              showsBuildings
              showsUserLocation
              followsUserLocation
              provider={PROVIDER_GOOGLE}
              userLocationPriority="high"
              showsIndoorLevelPicker
              initialRegion={{
                latitude: 33.25405149775475,
                longitude: -97.15271196603254,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
              }}
              //mapType="hybrid"
              rotateEnabled
              onLongPress={handleMapLongPress} // Handle long press on the map
            >
               <View style={styles.header}>
              
                {
                  !isEnabled ? (
                    <Text style={styles.headerText}>Floor 1</Text>
                  ) : (
                    <Text style={styles.headerText}>Floor 2</Text>
                  )}
                
              
            </View>

           
            
             
              
              {(!isEnabled) ? 
                // First floor case
                (
                <View style={styles.firstFloor}> 
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
                    strokeColor="rgba(5, 5, 5,0.2)"
                    strokeWidth={4}
                  />

                  <Polyline
                    coordinates={dWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(18, 92, 22, 0.5)"
                    strokeWidth={4}
                  />

                  <Polyline
                    coordinates={dWing_internal.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(18, 92, 22, 0.5)"
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
                    strokeColor="rgba(5, 5, 5,0.2)"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={fWing_outline.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={fWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(24, 89, 32, 0.75)"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={fWing_2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  
                  <Polyline
                    coordinates={fWing_2.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(24, 89, 32, 0.75)"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={fWing_3.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={fWing_3.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(24, 89, 32, 0.75)"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={fWing_4.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={fWing_4.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(24, 89, 32, 0.75)"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={fWing_5.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={fWing_5.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="rgba(24, 89, 32, 0.75)"
                    strokeWidth={4}
                  />
                </View>
                
              ) :
              // 2nd floor case
              null}

              
             {showRoute && shortestRoute.map((nodeName, index) => {
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
                    strokeWidth={6}
                    lineJoin="round"
                  />
                );
              })}

        
        {bathroomFilter && (
          bathrooms.map((bathroom)=>(
            <Marker
            key={bathroom.id}
            coordinate={{
              latitude: bathroom.latitude,
              longitude: bathroom.longitude,
            }}
            onPress={()=>handleFilterPress(bathroom)}
            >
              <FontAwesome5 name="toilet" size={24} color="white" style={styles.bathroomStyles}
 />
            

            </Marker>
          ))
        )}

        {exitFilter && (
          exits.map((exit)=>(
            <Marker
            key={exit.id}
            coordinate={{
              latitude: exit.latitude,
              longitude: exit.longitude,
            }}
            >
        <FontAwesome name="fire-extinguisher" size={24} color="white" style={styles.exitStyles} />

            </Marker>
          ))
        )}

      {stairsFilter && (
          stairs.map((stair)=>(
            <Marker
            key={stair.id}
            coordinate={{
              latitude: stair.latitude,
              longitude: stair.longitude,
            }}
            >
       <MaterialIcons name="stairs" size={24} color="white" style={styles.stairStyles} />
            </Marker>
          ))
        )}



              


             
            </MapView>
            <View style={styles.switchContainer}>
                <Switch
                  trackColor={{false: '#767577', true: '#4bbd7d'}}
                  thumbColor={isEnabled ? '#white' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={styles.switch}
                />
                
                
              
              </View>
              {isLoading && (
                <View style={styles.activity}>
              <ActivityIndicator 
                size={'large'}
                />
              </View>

              )}

              {inRoute && (
              <TouchableOpacity style={styles.endRoute} 
              onPress={()=> {
                openSheet();
                setInRoute(false);
                setLat(0);
                setLong(0);
                setDestSelected(false);
                setShowRoute(false);
              }}>
                <Text style={styles.endRouteText}>End Route</Text>
              </TouchableOpacity>
            )}
              
              
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
                      <Filter 
                        handleBathroom={handleBathroom}
                        handleExits={handleExits}
                        handleStairs={handleStairs}
                        />
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
                        bottomSheetRef={bottomSheetRef}
                        handleSelection={handleSelection}
                        setNodeName={setNodeName}
                        setNodeDept={setNodeDept}
                        addToRecents={addToRecents}
                      />
                    )}
                     <BottomSheetFlatList
                    data={data}
                    //keyExtractor={(i) => i}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.contentContainer}
                    />
                  </View>
                </BottomSheet>
              
            
              {showStartButton && <StartButton nodeName={nodeName} nodeDept={nodeDept} showFilterName={showFilterName} displayName={displayName} getLocation={getLocation} handleCancel={handleCancel}/>}
            </View>
            
           
          </View>
        </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 20
        position: 'relative'
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
        // margin: 16,
        top: '40%',
        right: 0,
        //backgroundColor: 'black'
    },

    firstFloor: {
      //flex: 1
    },

    switch: {
      transform: [{ rotate: '270deg' }],
      left: 0,


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
      borderRadius: 15,
      backgroundColor: 'rgba(151, 151, 151, 0.25)',

    },
    header: {
      flex:1,
      height: 90,
      backgroundColor: '#4bbd7d',
      position: 'absolute',
      top:0,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 42
    },
    headerText: {
     color: 'white',
     fontWeight: '400',
     fontSize: 25
    },
    activity: {
      flex: 1,
     position: 'absolute',
     top: '50%',
     backgroundColor: 'white',
     right: '42%',
     borderRadius: 10,
     padding: 10
    }, 
    
    endRoute: {
      //flex:1,
      height: 90,
      backgroundColor: '#D9534F',
      position: 'absolute',
      bottom:0,
      width: 400,
      //marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',

      //paddingTop: 42
    },

    endRouteText: {
      color: 'white',
     fontWeight: '600',
     fontSize: 25,
      position: 'absolute',
     bottom: 30
    },
    bathroomStyles: {
      backgroundColor: '#4285F4',
      padding: 5,
      borderRadius: 50
    },
    stairStyles: {
      backgroundColor: "#AED581",
      padding: 5
    },
    exitStyles: {
      backgroundColor: "#FF4081",
      padding: 5
    }, 
    listHeader: {
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 5,
      alignContent: 'flex-start'
    },
    recentButton: {
      width: 360,
      height: 35, // Adjust the height of the TouchableOpacity if needed
      backgroundColor: 'white',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 50, 
      
    },
    recentButtonText: {
      color: 'black', // Change the text color as needed
      fontSize: 16,
      fontWeight: '400',
      paddingTop: 5,
      flex: 1,
      justifyContent: 'space-between'
    },



})
