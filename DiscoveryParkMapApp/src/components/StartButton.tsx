import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const App = ({ nodeName, nodeDept }) => {
  // ref
  const bottomSheetRef2 = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['14%', '80%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

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
        
      >
        <View style={styles.contentContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={styles.description}>
              {nodeName}
            </Text>
            <Text style={{color: 'grey'}}>
              {nodeDept}
            </Text>
            </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              GO 
            </Text>

          </TouchableOpacity>
        </View>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
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


});

export default App;