import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler"
import Navigation from './Navigation';

export default function App () {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
