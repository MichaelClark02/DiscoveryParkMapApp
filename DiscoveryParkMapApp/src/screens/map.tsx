import React, { useCallback, useMemo, useRef } from "react";
import { Text, View, StyleSheet, SafeAreaView,TouchableOpacity, Button, } from 'react-native'
import MapView from 'react-native-maps'
import { Marker, Overlay,AnimatedRegion } from "react-native-maps";
import { Component, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import HomeSearch from '../components/HomeSearch';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Filter from "../components/Filter";


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
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLong] = useState(0);
  const [txt, setTxt] = useState('');
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


      if(floor1){
        op = 1.0
      }
      else{
        op=1.0
      };
      return (
        <GestureHandlerRootView style={{flex: 1}}>
        <View>
          
          <MapView style={styles.map}
          showsBuildings
          showsUserLocation
          followsUserLocation
          showsIndoors
          provider="google"
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
                coordinate={{latitude: 33.254146359389125,
                longitude: -97.15246749126513}}
                title={"title"}
                description={"description"}
            />
            <Marker
                coordinate={{latitude: 33.25414750828636,
                longitude: -97.15235330068435}}
                title={"title"}
                description={"description"}
            />
            <Marker
                coordinate={{latitude: 33.218971854680454,
                longitude: -97.14628750676216}}
                title={"title"}
                description={"description"}
                
            />
            <Marker
                coordinate={{latitude: 33.25414841436669,
                longitude: -97.15243499440697}}
                title={"title"}
                description={"description"}
                
                
            />
            <Overlay
                bounds = {[topLeftOverlay,bottomRightOverlay]}
                image ={{ uri: 'https://imageupload.io/ib/srjyBOQLsvPDGS6_1698224053.png'}}
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
          <View>
            <Text>"{lat} {lon}"</Text>
            
          </View>

              
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
            />
            <View style={styles.contentContainer}>
              <Filter />
            </View>
          </BottomSheet>

          
        </View>
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


