import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PopNotification from './src/App';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PopNotification/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
