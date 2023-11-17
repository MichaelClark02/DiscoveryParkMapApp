import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler"
import Navigation from './Navigation';
import Navigator from './Navigator'
export default function App () {
  return (

    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
