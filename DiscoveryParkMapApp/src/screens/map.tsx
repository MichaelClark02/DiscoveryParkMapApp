import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";

export default function Map() {
    return (
        <MapView style={styles.container}
            initialRegion={{
            latitude: 33.2543,
            longitude: -97.1518,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,}}
            mapType='hybrid'
        >
        <Marker
            coordinate={{latitude: 33.2543,
            longitude: -97.1518}}
            title={"title"}
            description={"description"}
         />
      </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
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
