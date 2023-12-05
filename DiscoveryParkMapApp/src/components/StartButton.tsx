import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons'; 


const App = ({ nodeName, nodeDept, getLocation, handleCancel, showFilterName, displayName }) => {
  // ref
  const bottomSheetRef2 = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '25%', '20%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  // useEffect(()=>{
  //   bottomSheetRef2.current?.snapToPosition(0)
  // },[])

  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef2}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        //backgroundStyle={styles.sheetBackground}
        keyboardBehavior="fillParent"
        animateOnMount
        backgroundStyle={{backgroundColor: '#f0f0f0'}}
        
      >
        <View style={{flex: 1}}>
          <View style={styles.topBar}>
            <Text style={{fontWeight: '600', paddingLeft: 20, fontSize: 23}}>Directions</Text>
            <TouchableOpacity style={{ position: 'absolute', top: 0, right: '3%'}}
              onPress={()=>{
                //bottomSheetRef2.current?.close();
                handleCancel()
              }}>
            <MaterialIcons name="cancel" size={30} color="grey"  />
            </TouchableOpacity>
          </View>
        <View style={styles.contentContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={styles.description}>
              {showFilterName ? (
                <Text>{displayName}</Text>
              ) : (
                <Text>{nodeName}</Text>
              )}
            </Text>
            <Text style={{color: 'grey'}}>
              {nodeDept}
            </Text>
            </View>
          <TouchableOpacity style={styles.button} 
            onPress={()=> {
              getLocation(); 
              bottomSheetRef2.current?.close();
            }}>
            <Text style={styles.buttonText}>
              GO 
            </Text>

          </TouchableOpacity>
        </View>
        </View>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 25,
    marginTop: 15,
  },
  button: {
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 50,
    //paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  topBar: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 7,
    marginTop: 0

  }


});

export default App;